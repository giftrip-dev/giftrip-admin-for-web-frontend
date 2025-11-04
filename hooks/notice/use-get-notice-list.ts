import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import { NoticeListRes, NoticePaginationReq } from "@/app/api/dto/notice";
import { getNoticeList } from "@/app/api/notice";

export const useGetNoticeList = (params: NoticePaginationReq) => {
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
    type: params.type === "all" ? undefined : params.type,
    isActive: params.isActive === "all" ? undefined : params.isActive,
  };

  const key = ["/notices", trimmedParams] as const;
  const fetcher = async (args: readonly [string, NoticePaginationReq]) => {
    const [, req] = args;
    return getNoticeList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<NoticeListRes, Error>(
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
