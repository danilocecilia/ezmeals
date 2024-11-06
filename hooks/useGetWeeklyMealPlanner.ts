import { Meal } from '@types';
import useSWR from 'swr';

type FetcherResponse = Meal[];

const useGetWeeklyMealPlanner = () => {
  const fetcher = (url: string): Promise<FetcherResponse> =>
    fetch(url).then((res) => res.json());

  const { data, error } = useSWR<FetcherResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/upcomingMeals`,
    fetcher
  );

  return {
    weeklyMealPlanner: data,
    isLoading: !error && !data,
    isError: error
  };
};

export default useGetWeeklyMealPlanner;
