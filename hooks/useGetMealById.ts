import { Meal } from '@types';
import useSWR from 'swr';

type FetcherResponse = Meal;

const useGetMealById = (mealId: string) => {
  const fetcher = (url: string): Promise<FetcherResponse> =>
    fetch(url).then((res) => res.json());

  const { data, error } = useSWR<FetcherResponse>(
    mealId
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/getMeal/${mealId}`
      : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};

export default useGetMealById;
