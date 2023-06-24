import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import { PEOPLE_BY_ID } from './gql';

export const PeopleById = () => {
	const router = useRouter()
	const id = router?.query?.id || '1';
  const { data, loading } = useQuery(PEOPLE_BY_ID, { variables: { id }, context: { clientName: 'rest' } });

  if (loading) {
    return <div>Person loading...</div>;
  }
  const person = data?.getPeopleById || {}
  return (
    <div>
      <h1>{person.name}</h1>
			<button type="button" onClick={() => router.back()}>
				Back
			</button>
			<ul>
				<li>Gender : {person.gender}</li>
				<li>Height : {person.height} cm</li>
				<li>Weight : {person.mass} kg</li>
			</ul>
      {/* <pre>{JSON.stringify(data, null, '  ')}</pre> */}
    </div>
  );
};
