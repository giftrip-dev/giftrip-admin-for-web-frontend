import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schema/auth";
import { postLoggedIn } from "@/app/api/auth";
import { STORAGE_ADMIN_KEY } from "@/constants/storage";

// 로그인 훅
export const usePostLoggedIn = (
  onSuccess: (isPasswordChangeRequired: boolean) => void,
  onFail: (val: string) => void,
) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false); // 로딩 상태

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true); // 로딩 시작
    try {
      await new Promise((resolve) => setTimeout(resolve, 400)); // 0.4초 대기
      const res = await postLoggedIn(data); // 작품 생성
      document.cookie = `accessToken=${res.tokens.accessToken}; path=/;`;
      document.cookie = `refreshToken=${res.tokens.refreshToken}; path=/;`;
      const adminInfo = {
        name: res.name,
        loginId: res.loginId,
        role: res.role,
      };

      localStorage.setItem(STORAGE_ADMIN_KEY, JSON.stringify(adminInfo));

      // todo: 로그인 응답값 관리
      onSuccess(false);
    } catch (err: unknown) {
      onFail("아이디 또는 비밀번호를 확인해주세요.");
      console.error(err);
    } finally {
      setLoading(false); // 로딩 종료
    }
  });

  return { form, onSubmit, loading };
};
