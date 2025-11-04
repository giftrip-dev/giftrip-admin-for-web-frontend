import { useEffect, useState } from "react";
import useSWR from "swr";
import { NoticeItem } from "@/app/api/dto/notice";
import { getNoticeDetail } from "@/app/api/notice";

export const useGetNoticeDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/notices", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    // 0.3초 로딩
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getNoticeDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<NoticeItem, Error>(
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
