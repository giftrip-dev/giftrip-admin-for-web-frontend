import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import type {
  ShoppingPaginationReq,
  ShoppingPaginationRes,
} from "@/app/api/dto/shopping";
import { getShoppingList } from "@/app/api/shopping";

export const useGetShoppingProductList = (params: ShoppingPaginationReq) => {
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

  const key = ["/products", trimmedParams] as const;
  const fetcher = async (args: readonly [string, ShoppingPaginationReq]) => {
    const [, req] = args;
    return getShoppingList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<
    ShoppingPaginationRes,
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
