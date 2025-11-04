import { z } from "zod";

// 관리자 계정 생성 스키마
export const accountPostSchema = z.object({
  loginId: z.string({ required_error: "아이디를 입력해주세요" }).min(2),
  name: z.string({ required_error: "이름을 입력해주세요" }).min(1),
  password: z.string({ required_error: "비밀번호를 입력해주세요" }).min(1),
});
