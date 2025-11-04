import { BannerType, BANNER_CATEGORY } from "@/app/api/dto/banner";
import { z } from "zod";

export const mainBannerSchema = z.object({
  title: z.string({ required_error: "배너명을 입력해주세요" }).min(1, {
    message: "배너명을 입력해주세요",
  }),
  itemType: z.nativeEnum(BANNER_CATEGORY, {
    required_error: "카테고리를 선택해주세요",
  }),
  type: z.nativeEnum(BannerType),
  imageUrl: z.union([
    z
      .string({ required_error: "배너 이미지를 등록해주세요" })
      .min(1, { message: "배너 이미지를 등록해주세요" }),
    z.instanceof(File, { message: "배너 이미지를 등록해주세요" }),
  ]),
  displayOrder: z.string({ required_error: "출력 순서를 선택해주세요" }),
  isActive: z.string({ required_error: "공개 여부를 선택해주세요" }),
});

export const subBannerSchema = z.object({
  title: z.string({ required_error: "배너명을 입력해주세요" }).min(1, {
    message: "배너명을 입력해주세요",
  }),
  displayOrder: z.string({ required_error: "출력 순서를 선택해주세요" }),
  type: z.nativeEnum(BannerType),
  isActive: z.string({ required_error: "공개 여부를 선택해주세요" }),
  imageUrl: z.union([
    z
      .string({ required_error: "배너 이미지를 등록해주세요" })
      .min(1, { message: "배너 이미지를 등록해주세요" }),
    z.instanceof(File, { message: "배너 이미지를 등록해주세요" }),
  ]),
});
