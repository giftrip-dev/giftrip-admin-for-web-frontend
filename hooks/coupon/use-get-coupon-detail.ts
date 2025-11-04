import { useEffect, useState } from "react";
import useSWR from "swr";
import { CouponItem } from "@/app/api/dto/coupon";
import { getCouponDetail } from "@/app/api/coupon";

export const useGetCouponDetail = (couponId: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/coupons", couponId] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, req] = args;
    return getCouponDetail(req);
  };

  const { data, error, mutate, isValidating } = useSWR<CouponItem, Error>(
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
