import { useState } from "react";
import { toast } from "../use-toast";
import { deleteAccount } from "@/app/api/account";
import { useRouter } from "next/navigation";
import { ADMIN_ACCOUNT_PAGE } from "@/constants/path";
import { mutate } from "swr";

export const useDeleteAccount = (id: string) => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      await deleteAccount(id);
      await mutate((key) => {
        return Array.isArray(key) && key[0] === "/admin-users";
      });
      toast({
        title: "관리자 계정이 삭제 되었어요.",
      });
      setTimeout(() => {
        router.replace(ADMIN_ACCOUNT_PAGE);
      }, 300);
    } catch (err: unknown) {
      console.error(err);
      if (!err) return;
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading };
};
