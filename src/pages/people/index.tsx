import { useRouter } from 'next/router'
import { People } from '@components/People';

const PeoplePage = () => {
  const router = useRouter()
  return (
    <section>
      <h1>People List</h1>
      <button type="button" onClick={() => router.back()}>
				Back
			</button>
      <People />
    </section>
  );
};

export default PeoplePage;
