import { useEffect, useState } from "react";
import useSWR from "swr";
import { getAccommodationDetail } from "@/app/api/accommodation";
import type { AccommodationItem } from "@/app/api/dto/accommodation";

export const useGetAccommodationProductDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/accommodations", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    return getAccommodationDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<
    AccommodationItem,
    Error
  >(key, fetcher, {
    suspense: isClient,
    keepPreviousData: true,
  });

  return {
    data,
    isLoading: !data && !error,
    isError: !!error,
    isFetching: isValidating,
    mutate,
  };
};
