import { getAccountList } from "@/app/api/account";
import { AdminAccountRes } from "@/app/api/dto/account";
import { useState, useEffect } from "react";
import useSWR from "swr";

// 관리자 계정 목록 조회
export const useGetAccountList = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const key = ["/admin-users", page, limit] as const;

  const fetcher = (): Promise<AdminAccountRes> => getAccountList(page, limit);

  const { data, error, mutate, isValidating } = useSWR<AdminAccountRes>(
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
