import * as z from "zod";
import { ExposureTag } from "@/constants/product";
import { ShoppingCategory } from "@/app/api/dto/shopping";

// 쇼핑 상품 옵션 스키마
const shoppingOptionSchema = z.object({
  seq: z.number(),
  name: z.string().min(1, "옵션명을 입력해주세요."),
  price: z
    .union(
      [z.string().min(1, { message: "가격을 입력해주세요" }), z.number()],
      {
        required_error: "가격을 입력해주세요",
      },
    )
    .transform((val) => (typeof val === "string" ? Number(val) : val)),
  stockCount: z
    .union([z.string(), z.number()], {
      required_error: "재고 수량을 입력해주세요",
    })
    .transform((val) => (typeof val === "string" ? Number(val) : val)),
});

// 쇼핑 상품 스키마
export const shoppingProductSchema = z
  .object({
    options: z.array(shoppingOptionSchema).optional(),
    category: z.nativeEnum(ShoppingCategory, {
      required_error: "카테고리를 선택해주세요.",
    }),
    itemTags: z.array(z.string()).optional(),
    name: z.string({ required_error: "상품명을 입력해주세요." }).min(1, {
      message: "상품명을 입력해주세요.",
    }),
    description: z
      .string({ required_error: "상품 설명을 입력해주세요." })
      .min(1, {
        message: "상품 설명을 입력해주세요.",
      }),
    thumbnailUrl: z
      .union(
        [
          z.string({ required_error: "썸네일 이미지를 업로드해주세요." }),
          z.instanceof(File),
        ],
        {
          required_error: "썸네일 이미지를 업로드해주세요.",
        },
      )
      .refine((val) => val !== "", "썸네일 이미지를 업로드해주세요."),
    content: z
      .string({ required_error: "상품 상세 내용을 입력해주세요." })
      .min(1, {
        message: "상품 상세 내용을 입력해주세요.",
      }),
    manufacturer: z.string({ required_error: "제조사를 입력해주세요" }).min(1, {
      message: "제조사를 입력해주세요",
    }),
    origin: z.string({ required_error: "원산지를 입력해주세요" }).min(1, {
      message: "원산지를 입력해주세요",
    }),
    managerPhoneNumber: z.string().optional().nullable(),
    originalPrice: z
      .union(
        [z.string().min(1, { message: "가격을 입력해주세요" }), z.number()],
        { required_error: "가격을 입력해주세요" },
      )
      .transform((val) => (typeof val === "string" ? Number(val) : val)),
    finalPrice: z
      .union(
        [z.string().min(1, { message: "가격을 입력해주세요" }), z.number()],
        { required_error: "가격을 입력해주세요" },
      )
      .transform((val) => (typeof val === "string" ? Number(val) : val)),
    isActive: z.string({ required_error: "판매 상태를 선택해주세요" }).min(1, {
      message: "판매 상태를 선택해주세요",
    }),
    isOptionUsed: z
      .string({ required_error: "옵션 사용 여부를 선택해주세요" })
      .min(1, {
        message: "옵션 사용 여부를 선택해주세요",
      }),
    stockCount: z
      .union(
        [z.string({ required_error: "재고 수량을 입력해주세요" }), z.number()],
        {
          required_error: "재고 수량을 입력해주세요",
        },
      )
      .transform((val) => (typeof val === "string" ? Number(val) : val))
      .nullable(),
    appliedCouponId: z.string().optional().nullable(),
    memo: z.string().optional().nullable(),
    exposureTags: z.nativeEnum(ExposureTag).optional(),
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
    inquiryInfo: z.string().optional().nullable(),
    changeInfo: z.string().optional().nullable(),
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
    hasStockManagement: z
      .string({ required_error: "재고 관리 여부를 선택해주세요" })
      .min(1, {
        message: "재고 관리 여부를 선택해주세요",
      }),
  })
  .refine(
    (data) => {
      // 옵션 사용안함 + 재고 관리 사용일 때 stockCount 필수
      if (data.isOptionUsed === "false" && data.hasStockManagement === "true") {
        return (
          data.stockCount !== null &&
          data.stockCount !== undefined &&
          data.stockCount >= 0
        );
      }
      return true;
    },
    {
      message: "수량을 입력해주세요.",
      path: ["stockCount"],
    },
  );
