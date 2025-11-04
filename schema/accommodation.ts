import {
  AccommodationCategory,
  AccommodationMainLocation,
} from "@/app/api/dto/accommodation";
import { ACCOMMODATION_SUB_LOCATION_LABEL } from "@/constants/accommodation";
import { z } from "zod";

export const accommodationProductSchema = z.object({
  accommodationId: z.string().min(1, { message: "업체명을 입력해주세요" }),
  name: z
    .string({ message: "객실명을 입력해주세요" })
    .min(1, { message: "객실명을 입력해주세요" }),
  description: z.string().optional(),
  imageUrls: z.array(
    z.union([
      z
        .string({ required_error: "썸네일을 업로드해주세요" })
        .min(1, { message: "썸네일을 업로드해주세요" }),
      z.instanceof(File, { message: "썸네일을 업로드해주세요" }),
    ]),
  ),
  itemTags: z.array(z.string()).optional().nullable(),
  checkInTime: z
    .string({ required_error: "체크인 시간을 입력해주세요" })
    .min(1, { message: "체크인 시간을 입력해주세요" }),
  checkOutTime: z
    .string({ required_error: "체크아웃 시간을 입력해주세요" })
    .min(1, { message: "체크아웃 시간을 입력해주세요" }),
  checkInAmPm: z.string().optional(),
  checkInHour: z.string().optional(),
  checkOutAmPm: z.string().optional(),
  checkOutHour: z.string().optional(),
  availableFrom: z
    .string()
    .min(1, { message: "예약 가능 시작일을 입력해주세요" }),
  availableTo: z
    .string()
    .min(1, { message: "예약 가능 종료일을 입력해주세요" }),
  minOccupancy: z
    .union([
      z.string({ required_error: "인원을 입력해주세요" }),
      z.number({ required_error: "인원을 입력해주세요" }),
    ])
    .transform((val) => {
      if (typeof val === "string") {
        return Number(val);
      }
      return val;
    }),
  maxOccupancy: z
    .union([
      z.string({ required_error: "인원을 입력해주세요" }),
      z.number({ required_error: "인원을 입력해주세요" }),
    ])
    .transform((val) => {
      if (typeof val === "string") {
        return Number(val);
      }
      return val;
    }),
  originalPrice: z
    .union(
      [z.string().min(1, { message: "가격을 입력해주세요" }), z.number()],
      { required_error: "가격을 입력해주세요" },
    )
    .transform((val) => (typeof val === "string" ? Number(val) : val)),
  finalPrice: z
    .union(
      [z.string().min(1, { message: "최종 가격을 입력해주세요" }), z.number()],
      { required_error: "최종 가격을 입력해주세요" },
    )
    .transform((val) => (typeof val === "string" ? Number(val) : val)),
  dailyStock: z
    .union([
      z
        .string({ required_error: "재고를 입력해주세요" })
        .min(1, { message: "재고를 입력해주세요" }),
      z.number({ required_error: "재고를 입력해주세요" }),
    ])
    .transform((val) => (typeof val === "string" ? Number(val) : val)),
  isActive: z.string().min(1, { message: "판매 상태를 선택해주세요" }),
  appliedCouponId: z.string().optional().nullable(),
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

export const accommodationCompanySchema = z.object({
  mainLocation: z.nativeEnum(AccommodationMainLocation, {
    required_error: "대분류를 선택해주세요",
  }),
  subLocation: z.nativeEnum(ACCOMMODATION_SUB_LOCATION_LABEL).optional(),
  category: z.nativeEnum(AccommodationCategory, {
    required_error: "카테고리를 선택해주세요",
  }),
  address1: z
    .string({ required_error: "주소를 입력해주세요" })
    .min(1, { message: "주소를 입력해주세요" }),
  address2: z.string().optional(),
  postalCode: z.string().optional(),
  name: z
    .string({ required_error: "업체명을 입력해주세요" })
    .min(1, { message: "업체명을 입력해주세요" }),
  content: z
    .string({ required_error: "설명을 입력해주세요" })
    .min(1, { message: "설명을 입력해주세요" }),
  introduction: z
    .string()
    .min(1, { message: "소개를 입력해주세요" })
    .optional(),
  managerName: z
    .string({ required_error: "담당자 이름을 입력해주세요" })
    .min(1, { message: "담당자 이름을 입력해주세요" }),
  managerPhoneNumber: z
    .string({ required_error: "담당자 연락처를 입력해주세요" })
    .optional(),
  itemTags: z.array(z.string()).optional(),
  thumbnailUrl: z.union([
    z
      .string({ required_error: "썸네일을 업로드해주세요" })
      .min(1, { message: "썸네일을 업로드해주세요" }),
    z.instanceof(File, { message: "썸네일을 업로드해주세요" }),
  ]),
  relatedLink: z.string().optional(),
  inquiryInfo: z.string().optional(),
  changeInfo: z.string().optional(),
});
