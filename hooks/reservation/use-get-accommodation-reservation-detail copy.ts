import { useEffect, useState } from "react";
import useSWR from "swr";
import { getAccommodationReservationDetail } from "@/app/api/reservation";
import type { AccommodationReservationItem } from "@/app/api/dto/reservation";

// 체험단 예약 상세 조회
export const useGetAccommodationReservationDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/reservations/accommodation", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    return getAccommodationReservationDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<
    AccommodationReservationItem,
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
