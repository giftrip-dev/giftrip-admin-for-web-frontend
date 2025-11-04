import { useEffect, useState } from "react";
import useSWR from "swr";
import { getAccommodationCompanyList } from "@/app/api/accommodation";
import { AccommodationCompanyListRes } from "@/app/api/dto/accommodation";
import { AccommodationReservationListReq } from "@/app/api/dto/reservation";

export const useGetAccommodationCompanyList = (
  params: AccommodationReservationListReq,
) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 날짜 포맷팅
  const trimmedParams = {
    ...params,
  };

  const key = ["/accommodations", trimmedParams] as const;
  const fetcher = async (
    args: readonly [string, AccommodationReservationListReq],
  ) => {
    const [, req] = args;
    return getAccommodationCompanyList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<
    AccommodationCompanyListRes,
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
