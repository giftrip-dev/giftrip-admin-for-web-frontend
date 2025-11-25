import { useEffect, useState } from "react";
import useSWR from "swr";
import { StatisticsResponse } from "@/app/api/dto/statistics";
import { getStatistics } from "@/app/api/statistics";

export const useGetStatistics = () => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = "/statistics" as const;
  const fetcher = async () => {
    return getStatistics();
  };

  const { data, error, mutate, isValidating } = useSWR<
    StatisticsResponse,
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
