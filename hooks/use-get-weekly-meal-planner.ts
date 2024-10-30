import useSWR from 'swr';

const useGetWeeklyMealPlanner = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/upcomingMeals`,
    fetcher
  );

  return {
    weeklyMealPlanner: data,
    isLoading: isLoading,
    isError: error
  };
};

export default useGetWeeklyMealPlanner;
