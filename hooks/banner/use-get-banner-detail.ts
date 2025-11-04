import { useEffect, useState } from "react";
import useSWR from "swr";
import { BannerItem } from "@/app/api/dto/banner";
import { getBannerDetail } from "@/app/api/banner";

export const useGetBannerDetail = (id: string) => {
  // 클라이언트 단에서만 suspense 활성화 (hydration guard)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/banners", id] as const;
  const fetcher = async (args: readonly [string, string]) => {
    const [, id] = args;
    // 0.3초 로딩
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getBannerDetail(id);
  };

  const { data, error, mutate, isValidating } = useSWR<BannerItem, Error>(
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
