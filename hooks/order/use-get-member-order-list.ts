import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import { OrderListResponse, OrderPaginationReq } from "@/app/api/dto/order";
import { getMemberOrderList } from "@/app/api/order";

export const useGetMemberOrderList = (
  memberId: string,
  params: OrderPaginationReq,
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
  };

  const key = ["/orders/user", memberId, trimmedParams] as const;
  const fetcher = async (args: readonly [string, OrderPaginationReq]) => {
    const [, req] = args;
    return getMemberOrderList(memberId, req);
  };

  const { data, error, mutate, isValidating } = useSWR<
    OrderListResponse,
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
