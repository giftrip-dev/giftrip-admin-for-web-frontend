import { useEffect, useState } from "react";
import useSWR from "swr";
import { MemberDetailItem } from "@/app/api/dto/member";
import { getMemberDetail } from "@/app/api/member";

export const useGetMemberDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/members", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    // 0.3초 로딩
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getMemberDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<MemberDetailItem, Error>(
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
