import { useEffect, useState } from "react";
import useSWR from "swr";
import { getCampaignDetail } from "@/app/api/campaign";
import type { CampaignItem } from "@/app/api/dto/campaign";

export const useGetCampaignProductDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/campaigns", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    return getCampaignDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<CampaignItem, Error>(
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
