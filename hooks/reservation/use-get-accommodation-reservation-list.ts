import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import {
  AccommodationReservationListReq,
  AccommodationReservationListRes,
} from "@/app/api/dto/reservation";
import { getAccommodationReservationList } from "@/app/api/reservation";

// 숙소 예약 목록 조회
export const useGetAccommodationReservationList = (
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
    checkInDateStart: params.checkInDateStart
      ? formattedDate(params.checkInDateStart, "YYYY-MM-DD")
      : undefined,
    checkInDateEnd: params.checkInDateEnd
      ? formattedDate(params.checkInDateEnd, "YYYY-MM-DD")
      : undefined,
    category: params.category === "all" ? undefined : params.category,
    status: params.status === "all" ? undefined : params.status,
    matchingStatus:
      params.matchingStatus === "all" ? undefined : params.matchingStatus,
  };

  const key = ["/reservations/accommodation", trimmedParams] as const;
  const fetcher = async (
    args: readonly [string, AccommodationReservationListReq],
  ) => {
    const [, req] = args;
    return getAccommodationReservationList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<
    AccommodationReservationListRes,
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
