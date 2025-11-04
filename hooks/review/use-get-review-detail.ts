import { useEffect, useState } from "react";
import useSWR from "swr";
import { ReviewItem } from "@/app/api/dto/review";
import { getReviewDetail } from "@/app/api/review";

export const useGetReviewDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/reviews", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    // 0.3초 로딩
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getReviewDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<ReviewItem, Error>(
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
