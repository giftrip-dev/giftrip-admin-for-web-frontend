import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import {
  ExperienceReservationListReq,
  ExperienceReservationListRes,
} from "@/app/api/dto/reservation";
import { getExperienceReservationList } from "@/app/api/reservation";

// 체험 예약 목록 조회
export const useGetExperienceReservationList = (
  params: ExperienceReservationListReq,
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

  const key = ["/reservations/experience", trimmedParams] as const;
  const fetcher = async (
    args: readonly [string, ExperienceReservationListReq],
  ) => {
    const [, req] = args;
    return getExperienceReservationList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<
    ExperienceReservationListRes,
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
