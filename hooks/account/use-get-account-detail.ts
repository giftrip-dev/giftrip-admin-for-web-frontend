import { getAccountDetail } from "@/app/api/account";
import { AdminAccount } from "@/app/api/dto/account";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 관리자 계정 상세 조회
export const useGetAccountDetail = (id: string) => {
  const [result, setRes] = useState<{
    get: () => AdminAccount | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getAccountDetail(id));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
