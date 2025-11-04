import { useEffect, useState } from "react";
import useSWR from "swr";
import { getShoppingDetail } from "@/app/api/shopping";
import type { ShoppingItem } from "@/app/api/dto/shopping";

export const useGetShoppingProductDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/products", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    return getShoppingDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<ShoppingItem, Error>(
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
