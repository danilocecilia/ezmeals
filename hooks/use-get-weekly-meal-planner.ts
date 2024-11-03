import useSWR from 'swr';

type WeeklyMealPlanner = {
  id: string;
  value: string;
  label: string;
  quantity: number;
  image: string;
  deliveryDate: string;
  dateFrom: string;
  dateTo: string;
};

type FetcherResponse = WeeklyMealPlanner[];

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
