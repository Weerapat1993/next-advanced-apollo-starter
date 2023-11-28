import { useRouter } from 'next/router'
import MarketList from '@modules/market/components/MarketList';

const MarketPage = () => {
  const router = useRouter()
  return (
    <section>
      <h1>Market List</h1>
      <button type="button" onClick={() => router.back()}>
				Back
			</button>
      <hr />
      <MarketList />
    </section>
  );
};

export default MarketPage;