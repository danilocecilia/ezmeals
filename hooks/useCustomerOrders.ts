import useSWR from 'swr';
import { OrderProps } from 'types';

const useCustomerOrders = ({ userId }: { userId: string }) => {
  const fetcher = (url: string): Promise<OrderProps[]> =>
    fetch(url).then((res) => res.json());

  const { data, isLoading, error } = useSWR<OrderProps[]>(
    userId
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/orders/get/${userId}`
      : null,
    fetcher
  );

  return {
    data: data || [],
    isLoading: isLoading || (!error && !data),
    isError: error
  };
};

export default useCustomerOrders;
