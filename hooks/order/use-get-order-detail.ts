import { useEffect, useState } from "react";
import useSWR from "swr";
import { getOrderDetail } from "@/app/api/order";
import type { OrderDetailItem } from "@/app/api/dto/order";

export const useGetOrderDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/orders", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    return getOrderDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<OrderDetailItem, Error>(
    key,
    fetcher,
    {
      suspense: isClient,
      keepPreviousData: true,
    },
  );

  return {
    data,
    isLoading: !data && !error,
    isError: !!error,
    isFetching: isValidating,
    mutate,
  };
};
