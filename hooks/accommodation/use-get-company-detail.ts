import { useEffect, useState } from "react";
import useSWR from "swr";
import { getAccommodationCompanyDetail } from "@/app/api/accommodation";
import type { AccommodationCompanyItem } from "@/app/api/dto/accommodation";

// 업체 상세 정보 조회
export const useGetAccommodationCompanyDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // id가 없으면 API 호출하지 않음
  const key = id ? ["/accommodations", id] : null;

  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    return getAccommodationCompanyDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<
    AccommodationCompanyItem,
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
