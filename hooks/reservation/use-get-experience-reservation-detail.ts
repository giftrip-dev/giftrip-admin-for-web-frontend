import { useEffect, useState } from "react";
import useSWR from "swr";
import { getExperienceReservationDetail } from "@/app/api/reservation";
import type { ExperienceReservationItem } from "@/app/api/dto/reservation";

// 체험 예약 상세 조회
export const useGetExperienceReservationDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/reservations/experience", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    return getExperienceReservationDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<
    ExperienceReservationItem,
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
