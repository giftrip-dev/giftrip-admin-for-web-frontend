import { useEffect, useState } from "react";
import useSWR from "swr";
import { getCampaignReservationDetail } from "@/app/api/reservation";
import type { CampaignReservationItem } from "@/app/api/dto/reservation";

// 체험단 예약 상세 조회
export const useGetCampaignReservationDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/reservations/campaign", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    return getCampaignReservationDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<
    CampaignReservationItem,
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
