// 쿠폰 생성 스키마
import { CouponScope } from "@/app/api/dto/coupon";
import { PRODUCT_TYPES } from "@/constants/product";
import { z } from "zod";

export const couponCreateSchema = z
  .object({
    isActive: z.string({ required_error: "활성화 여부를 선택해주세요" }),
    scope: z.nativeEnum(CouponScope, {
      required_error: "사용 범위를 선택해주세요",
    }),
    itemType: z.nativeEnum(PRODUCT_TYPES, {
      required_error: "카테고리를 선택해주세요",
    }),
    name: z.string({ required_error: "쿠폰명을 입력해주세요" }).min(1, {
      message: "쿠폰명을 입력해주세요",
    }),
    description: z.string().optional(),
    discountRate: z.string({ required_error: "할인율을 입력해주세요" }),
    hasPeriod: z.string({ required_error: "기간 유무를 선택해주세요" }),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.hasPeriod === "true") {
        return data.startDate && data.startDate.trim() !== "";
      }
      return true;
    },
    {
      message: "적용 시작일을 선택해주세요",
      path: ["startDate"],
    },
  )
  .refine(
    (data) => {
      if (data.hasPeriod === "true") {
        return data.endDate && data.endDate.trim() !== "";
      }
      return true;
    },
    {
      message: "적용 종료일을 선택해주세요",
      path: ["endDate"],
    },
  );
