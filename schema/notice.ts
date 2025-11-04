import { NoticeType } from "@/app/api/dto/notice";
import { z } from "zod";

export const noticeSchema = z
  .object({
    title: z.string({ required_error: "제목을 입력해주세요" }).min(1, {
      message: "제목을 입력해주세요",
    }),
    type: z.nativeEnum(NoticeType, {
      required_error: "게시글 유형을 선택해주세요",
    }),
    content: z.string({ required_error: "내용을 입력해주세요" }).min(1, {
      message: "내용을 입력해주세요",
    }),
    thumbnailUrl: z
      .union([
        z
          .string({ required_error: "썸네일을 등록해주세요" })
          .min(1, { message: "썸네일을 등록해주세요" }),
        z.instanceof(File, { message: "썸네일을 등록해주세요" }),
      ])
      .optional(),
    isActive: z.string({ required_error: "공개 여부를 선택해주세요" }),
  })
  .refine(
    (data) => {
      if (data.type === NoticeType.NOTICE) {
        return true; // NOTICE 타입일 때는 썸네일 선택사항
      }
      return data.thumbnailUrl !== undefined;
    },
    {
      message: "썸네일을 등록해주세요",
      path: ["thumbnailUrl"],
    },
  );
