import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountPostSchema } from "@/schema/account";
import { postAccount } from "@/app/api/account";
import { mutate } from "swr";

export const usePostAccount = (closeModal: () => void) => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  const form = useForm<z.infer<typeof accountPostSchema>>({
    resolver: zodResolver(accountPostSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true); // 로딩 시작
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      await postAccount(data);
      // 배너 목록 데이터 갱신
      await mutate((key) => {
        return Array.isArray(key) && key[0] === "/admin-users";
      });
      toast({
        title: `계정이 생성 되었어요`,
      });
      closeModal();
    } catch (err: unknown) {
      console.error(err);
      if (!err) return;
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setLoading(false); // 로딩 종료
    }
  });

  return { onSubmit, form, loading };
};
