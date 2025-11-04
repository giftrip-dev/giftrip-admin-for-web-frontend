import { useEffect, useState } from "react";
import useSWR from "swr";
import { getExperienceDetail } from "@/app/api/experience";
import type { ExperienceItem } from "@/app/api/dto/experience";

export const useGetExperienceProductDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/experiences", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    return getExperienceDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<ExperienceItem, Error>(
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
