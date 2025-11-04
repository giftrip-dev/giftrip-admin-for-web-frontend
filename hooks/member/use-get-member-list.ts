import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import { MemberListReq, MemberListRes, MemberType } from "@/app/api/dto/member";
import { getMemberList } from "@/app/api/member";

export const useGetMemberList = (params: MemberListReq) => {
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
    isInfluencer:
      params.isInfluencer === MemberType.ALL
        ? undefined
        : params.isInfluencer === MemberType.INFLUENCER,
  };

  const key = ["/members", trimmedParams] as const;
  const fetcher = async (args: readonly [string, MemberListReq]) => {
    const [, req] = args;
    return getMemberList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<MemberListRes, Error>(
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
