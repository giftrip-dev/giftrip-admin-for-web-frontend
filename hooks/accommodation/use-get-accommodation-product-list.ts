import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import { getAccommodationList } from "@/app/api/accommodation";
import {
  AccommodationCategory,
  AccommodationMainLocation,
  AccommodationPaginationReq,
  AccommodationPaginationRes,
  AccommodationSubLocation,
} from "@/app/api/dto/accommodation";

export const useGetAccommodationProductList = (
  params: AccommodationPaginationReq,
) => {
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
    category:
      params.category === AccommodationCategory.ALL
        ? undefined
        : params.category,
    mainLocation:
      params.mainLocation === AccommodationMainLocation.ALL
        ? undefined
        : params.mainLocation,
    subLocation:
      params.subLocation === AccommodationSubLocation.ALL
        ? undefined
        : params.subLocation,
  };

  const key = ["/accommodations/rooms", trimmedParams] as const;
  const fetcher = async (
    args: readonly [string, AccommodationPaginationReq],
  ) => {
    const [, req] = args;
    return getAccommodationList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<
    AccommodationPaginationRes,
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
