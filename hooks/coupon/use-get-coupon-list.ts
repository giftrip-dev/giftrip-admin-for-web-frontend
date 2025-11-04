import { useEffect, useState } from "react";
import useSWR from "swr";
import formattedDate from "@/util/date";
import { CouponListReq, CouponListRes } from "@/app/api/dto/coupon";
import { getCouponList } from "@/app/api/coupon";

export const useGetCouponList = (params: CouponListReq) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 날짜 포맷팅
  const trimmedParams = {
    ...params,
    validFrom: params.validFrom
      ? formattedDate(params.validFrom, "YYYY-MM-DD")
      : undefined,
    validTo: params.validTo
      ? formattedDate(params.validTo, "YYYY-MM-DD")
      : undefined,
    itemType: params.itemType === "all" ? undefined : params.itemType,
    scope: params.scope === "all" ? undefined : params.scope,
    isActive: params.isActive === "all" ? undefined : params.isActive,
    isExpired: params.isExpired === "all" ? undefined : params.isExpired,
  };

  const key = ["/coupons", trimmedParams] as const;
  const fetcher = async (args: readonly [string, CouponListReq]) => {
    const [, req] = args;
    return getCouponList(req);
  };

  const { data, error, mutate, isValidating } = useSWR<CouponListRes, Error>(
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
