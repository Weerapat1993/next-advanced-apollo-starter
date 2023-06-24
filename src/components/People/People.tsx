import { useQuery } from '@apollo/client';
import Link from 'next/link'
import { PEOPLE_LIST } from './gql';

export const People = () => {
  const { data, loading } = useQuery(PEOPLE_LIST, { context: { clientName: 'rest' } });

  if (loading) {
    return <div>Peoples loading...</div>;
  }
  const peoples = data?.peoples?.results || []
  const count = data?.peoples?.count || 0
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
      {/* <pre>{JSON.stringify(data, null, '  ')}</pre> */}
    </div>
  );
};
