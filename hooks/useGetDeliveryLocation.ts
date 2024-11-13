// import { Meal } from '@types';
import useSWR from 'swr';

// type FetcherResponse = Meal;

const useGetDeliveryLocation = (location: string) => {
  const fetcher = (url: string): Promise<any> =>
    fetch(url).then((res) => res.json());

  const { data, isLoading, error } = useSWR<any>(
    location
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/getDeliveryLocation/${location}`
      : null,
    fetcher
  );

  const parseData = (data: any) => {
    if (!data) return [];
    if (Array.isArray(data?.data?.streets)) return data?.data?.streets?.street;
    if (typeof data?.data?.streets?.street === 'string') {
      return [data?.data?.streets?.street];
    }
  };

  return {
    data: parseData(data),
    isLoading: isLoading || (!error && !data),
    isError: error
  };
};

export default useGetDeliveryLocation;
