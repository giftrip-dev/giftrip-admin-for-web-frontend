import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import { getCampaignList } from "@/app/api/campaign";
import {
  CampaignPaginationReq,
  CampaignPaginationRes,
} from "@/app/api/dto/campaign";

export const useGetCampaignProductList = (params: CampaignPaginationReq) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 날짜 포맷팅
  const trimmedParams = {
    ...params,
    createdAtStart: params.createdAtStart
      ? formattedDate(params.createdAtStart, "YYYY-MM-DD")
      : undefined,
    createdAtEnd: params.createdAtEnd
      ? formattedDate(params.createdAtEnd, "YYYY-MM-DD")
      : undefined,
    exposureTags:
      params.exposureTags === "all" ? undefined : params.exposureTags,
    category: params.category === "all" ? undefined : params.category,
  };

  const key = ["/campaigns", trimmedParams] as const;
  const fetcher = async (args: readonly [string, CampaignPaginationReq]) => {
    const [, req] = args;
    return getCampaignList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<
    CampaignPaginationRes,
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
