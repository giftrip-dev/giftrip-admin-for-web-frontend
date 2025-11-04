import { useEffect, useState } from "react";
import useSWR from "swr";
import { getExperienceList } from "@/app/api/experience";
import formattedDate from "@/util/date";
import type {
  ExperiencePaginationReq,
  ExperiencePaginationRes,
} from "@/app/api/dto/experience";

export const useGetExperienceProductList = (
  params: ExperiencePaginationReq,
) => {
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
    exposureTag: params.exposureTag === "all" ? undefined : params.exposureTag,
    category: params.category === "all" ? undefined : params.category,
  };

  const key = ["/experiences", trimmedParams] as const;
  const fetcher = async (args: readonly [string, ExperiencePaginationReq]) => {
    const [, req] = args;
    return getExperienceList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<
    ExperiencePaginationRes,
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
