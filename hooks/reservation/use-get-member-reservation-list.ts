import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  MemberReservationListRes,
  ExperienceReservationListReq,
} from "@/app/api/dto/reservation";
import { getMemberReservationList } from "@/app/api/reservation";

export const useGetMemberReservationList = (
  memberId: string,
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
  };

  const key = ["/reservations/user", memberId, trimmedParams] as const;
  const fetcher = async (
    args: readonly [string, ExperienceReservationListReq],
  ) => {
    const [, req] = args;
    return getMemberReservationList(memberId, req);
  };

  const { data, error, mutate, isValidating } = useSWR<
    MemberReservationListRes,
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
