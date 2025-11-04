import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import { BannerListRes, BannerPaginationReq } from "@/app/api/dto/banner";
import { getBannerList } from "@/app/api/banner";

export const useGetBannerList = (params: BannerPaginationReq) => {
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
    itemType: params.itemType === "all" ? undefined : params.itemType,
    orderDirection:
      params.orderDirection === "all" ? undefined : params.orderDirection,
  };

  const key = ["/banners", trimmedParams] as const;
  const fetcher = async (args: readonly [string, BannerPaginationReq]) => {
    const [, req] = args;
    return getBannerList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<BannerListRes, Error>(
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
