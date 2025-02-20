import { apiWithClientToken } from '@/apis/clientActions';

export default function useGetGoalList() {
  const getGoalList = async (nextIndex?: number) => {
    const { data } = await apiWithClientToken.get('/goals', {
      params: { pageSize: 9999 } //차후 nextIndex받아오는걸로 수정
    });

    return data;
  };

  return { getGoalList };
}
