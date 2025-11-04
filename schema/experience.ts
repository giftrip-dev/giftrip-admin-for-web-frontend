import { ExperienceCategory } from "@/app/api/dto/experience";
import { ExposureTag } from "@/constants/product";
import { z } from "zod";

export const experienceProductSchema = z.object({
  title: z
    .string({ required_error: "상품명을 입력해주세요" })
    .min(1, { message: "상품명을 입력해주세요" }),
  description: z
    .string({ required_error: "설명을 입력해주세요" })
    .min(1, { message: "설명을 입력해주세요" }),
  content: z.string({ required_error: "내용을 입력해주세요" }).min(1, {
    message: "내용을 입력해주세요",
  }),
  originalPrice: z
    .union(
      [
        z.string({ required_error: "가격을 입력해주세요" }).min(1, {
          message: "가격을 입력해주세요",
        }),
        z.number(),
      ],
      { required_error: "가격을 입력해주세요" },
    )
    .transform((val) => (typeof val === "string" ? Number(val) : val)),
  finalPrice: z
    .union(
      [z.string().min(1, { message: "최종 가격을 입력해주세요" }), z.number()],
      { required_error: "최종 가격을 입력해주세요" },
    )
    .transform((val) => (typeof val === "string" ? Number(val) : val)),
  thumbnailUrl: z.union([
    z
      .string({ required_error: "썸네일을 업로드해주세요" })
      .min(1, { message: "썸네일을 업로드해주세요" }),
    z.instanceof(File, { message: "썸네일을 업로드해주세요" }),
  ]),
  isActive: z.string({ required_error: "판매 상태를 선택해주세요" }).min(1, {
    message: "판매 상태를 선택해주세요",
  }),
  itemTags: z.array(z.string()).optional().nullable(),
  category: z.nativeEnum(ExperienceCategory, {
    required_error: "카테고리를 선택해주세요",
  }),
  exposureTags: z.nativeEnum(ExposureTag).optional(),
  address1: z
    .string({ required_error: "장소를 입력해주세요" })
    .min(1, { message: "장소를 입력해주세요" }),
  managerPhoneNumber: z.string().optional().nullable(),
  appliedCouponId: z.string().optional().nullable(),
  relatedLink: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) =>
        val === null ||
        val === undefined ||
        val.length === 0 ||
        z.string().url().safeParse(val).success,
      {
        message: "유효한 링크를 입력해주세요",
      },
    ),
  dailyStock: z
    .union(
      [
        z.string({ required_error: "재고를 입력해주세요" }).min(1, {
          message: "재고를 입력해주세요",
        }),
        z.number(),
      ],
      { required_error: "재고를 입력해주세요" },
    )
    .transform((val) => (typeof val === "string" ? Number(val) : val))
    .refine((val) => val >= 1, {
      message: "재고는 1개 이상이어야 합니다",
    }),
  inquiryInfo: z.string({ required_error: "문의 정보를 입력해주세요" }).min(1, {
    message: "문의 정보를 입력해주세요",
  }),
  changeInfo: z
    .string({ required_error: "취소 및 환불 정보를 입력해주세요" })
    .min(1, {
      message: "취소 및 환불 정보를 입력해주세요",
    }),
  appliedCoupon: z
    .object({
      id: z.string(),
      name: z.string(),
      discountRate: z.number(),
      startDate: z.string().nullable(),
      endDate: z.string().nullable(),
    })
    .optional()
    .nullable(),
});
