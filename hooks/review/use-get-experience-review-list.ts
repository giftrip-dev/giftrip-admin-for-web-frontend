import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import { ReviewListRes, ReviewListReq } from "@/app/api/dto/review";
import { getReviewList } from "@/app/api/review";

export const useGetExperienceReviewList = (params: ReviewListReq) => {
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
    isActive: params.isActive === "all" ? undefined : params.isActive,
  };

  const key = ["/reviews", trimmedParams] as const;
  const fetcher = async (args: readonly [string, ReviewListReq]) => {
    const [, req] = args;
    return getReviewList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<ReviewListRes, Error>(
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
