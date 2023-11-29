import { useQuery } from "@apollo/client";
import { MARKET_LIST } from "../graphql/query";

export const useMarket = ({ keyword, server, category, refine, sort }) => {
  const { data, loading, error } = useQuery(MARKET_LIST, {
    variables: {
      server, 
      category: category ? `&category=${category}` : ''
    }, 
    context: { 
      clientName: 'rest'
    },
    ssr: false
  });
  
  let list = (data?.getMarket || []).filter(item => item.nft.nameEnglish.toLowerCase().includes(keyword.toLowerCase()) || item.nft.id.toString().includes(keyword.toLowerCase()))
  if(refine) {
    list = list.filter(item => item.nft.refine >= refine)
  }
  switch(sort) {
    case 'asc':
      break
    case 'desc':
      list = list.reverse()
      break
    case 'price_asc':
      list = list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break
    case 'price_desc':
      list = list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break
  }
  return { data: list, loading, error }
}