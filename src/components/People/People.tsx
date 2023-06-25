import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PEOPLE_LIST } from './gql';

export const People = () => {
  const router = useRouter()
  const page = +router?.query?.page || 1
  const { data, loading } = useQuery(PEOPLE_LIST, { variables: { page }, context: { clientName: 'rest' } });

  if (loading) {
    return <div>Peoples loading...</div>;
  }
  const peoples = data?.getPeoples?.results || []
  const count = data?.getPeoples?.count || 0
  const isNext = Boolean(data?.getPeoples?.next)
  const isPrev = Boolean(data?.getPeoples?.previous)
  return (
    <div>
      {count && <div>Count : {count}</div>}
      <ul>
        {peoples.map(people => {
          const url = people?.url || ''
          const id = url?.split('/')?.[5] || 0
          return (
            <li key={id}>
              <Link href={`/people/${id}`}>{people.name}</Link>
            </li>
          )
        })}
      </ul>
      {isPrev && (
        <button onClick={() => router.push(`/people?page=${page-1}`)}>
          Previous
        </button>
      )}
      {isNext && (
        <button onClick={() => router.push(`/people?page=${page+1}`)}>
          Next
        </button>
      )}
      {/* <pre>{JSON.stringify(data, null, '  ')}</pre> */}
    </div>
  );
};
