import { useMemo } from 'react';
import merge from 'deepmerge';
import cookie from 'cookie';
import Cookies from 'js-cookie'
import type { GetServerSidePropsContext } from 'next';
import type { IncomingMessage } from 'http';
import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RestLink } from 'apollo-link-rest';
import isEqual from 'lodash.isequal';

interface PageProps {
  props?: Record<string, any>;
}

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__';
export const COOKIES_TOKEN_NAME = 'jwt';

const getToken = (req?: IncomingMessage) => {
  const parsedCookie = cookie.parse(
    req ? req.headers.cookie ?? '' : document.cookie,
  );

  return parsedCookie[COOKIES_TOKEN_NAME];
};

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

const createApolloClient = (ctx?: GetServerSidePropsContext) => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    // Get the authentication token from cookies
    const token = getToken(ctx?.req);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const authRestLink = new ApolloLink((operation, forward) => {
    operation.setContext(({headers}) => {
      const token = getToken(ctx?.req);
      return {
        headers: {
          ...headers,
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : ''
        }
      };
    });
    return forward(operation).map(result => {
      const { restResponses } = operation.getContext();
      const authTokenResponse = restResponses.find(res => res.headers.has("Authorization"));
      // You might also filter on res.url to find the response of a specific API call
      if (authTokenResponse) {
        Cookies.set(COOKIES_TOKEN_NAME, authTokenResponse.headers.get("Authorization"))
      }
      return result;
    });
  });

  const restLink = new RestLink({ 
    uri: "https://swapi.dev/api/"
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.split(
      operation => operation.getContext().clientName === 'rest',
      ApolloLink.from([authRestLink, restLink]),
      authLink.concat(httpLink),
    ),
    cache: new InMemoryCache(),
  });
};

export function initializeApollo(initialState = null, ctx = null) {
  const client = apolloClient ?? createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

    // Restore the cache with the merged data
    client.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: PageProps,
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: PageProps) {
  const state = pageProps[APOLLO_STATE_PROPERTY_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
}
