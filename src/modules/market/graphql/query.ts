import { gql } from '@apollo/client'

export const MARKET_LIST = gql`
  query getMarket($server: Number!, $category: String) {
    getMarket(
      server: $server
      category: $category
    ) 
    @rest(
      type: "Market", 
      path: "/market/list?status=LISTING{args.category}&serverId={args.server}"
    ) {
      id
      price
      nft
    }
  }
`;