import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import {
  CampaignReservationListReq,
  CampaignReservationListRes,
} from "@/app/api/dto/reservation";
import { getCampaignReservationList } from "@/app/api/reservation";

// 체험단 예약 목록 조회
export const useGetCampaignReservationList = (
  params: CampaignReservationListReq,
) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 날짜 포맷팅
  const trimmedParams = {
    ...params,
    experienceDateStart: params.experienceDateStart
      ? formattedDate(params.experienceDateStart, "YYYY-MM-DD")
      : undefined,
    experienceDateEnd: params.experienceDateEnd
      ? formattedDate(params.experienceDateEnd, "YYYY-MM-DD")
      : undefined,
    category: params.category === "all" ? undefined : params.category,
    status: params.status === "all" ? undefined : params.status,
  };

  const key = ["/reservations/campaign", trimmedParams] as const;
  const fetcher = async (
    args: readonly [string, CampaignReservationListReq],
  ) => {
    const [, req] = args;
    return getCampaignReservationList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<
    CampaignReservationListRes,
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
