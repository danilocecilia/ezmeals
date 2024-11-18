import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

interface DeliveryLocationData {
  data?: {
    streets?: {
      street?: string | string[];
    };
  };
}

const useGetDeliveryLocation = (location: string) => {
  const [debouncedLocation] = useDebounce(location, 500); // 500ms debounce

  const fetcher = (url: string): Promise<DeliveryLocationData> =>
    fetch(url).then((res) => res.json());

  const { data, isLoading, error } = useSWR<DeliveryLocationData>(
    debouncedLocation
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/getDeliveryLocation/${debouncedLocation}`
      : null,
    fetcher
  );

  const parseData = (data: DeliveryLocationData | undefined) => {
    // console.log('🚀 ~ parseData ~ data:', data);
    if (!data) return [];
    if (Array.isArray(data?.data?.streets?.street))
      return data?.data?.streets?.street;
    if (typeof data?.data?.streets?.street === 'string') {
      return [data?.data?.streets?.street];
    }
    return [];
  };

  return {
    data: parseData(data),
    isLoading: isLoading,
    isError: error
  };
};

export default useGetDeliveryLocation;
