import { ProductType } from "@/constants/product";
import { PaginationMeta } from "./shopping";

// 쿠폰 적용 대상
export enum CouponScope {
  PRODUCT_REGISTRATION = "product_registration",
  ALL_CUSTOMERS = "all_customers",
  INDIVIDUAL_CUSTOMER = "individual_customer",
}

export type CouponType = ProductType | "all";

// 쿠폰 아이템
export interface CouponItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  itemType: CouponType;
  startDate: string;
  endDate: string;
  discountRate: number;
  scope: CouponScope;
  isActive: boolean;
  usedCount: number;
  isExpired: boolean;
  description?: string;
}

// 쿠폰 목록 조회 응답
export interface CouponListRes {
  items: CouponItem[];
  meta: PaginationMeta;
}

// 쿠폰 목록 조회 요청
export interface CouponListReq {
  page: number;
  limit: number;
  itemType?: CouponType;
  scope?: CouponScope | "all";
  isActive?: boolean | "all";
  isExpired?: boolean | "all";
  validFrom?: string;
  validTo?: string;
  search?: string;
}

// 쿠폰 생성 요청
export interface CouponCreateReq {
  name: string;
  itemType: ProductType;
  startDate?: string;
  endDate?: string;
  discountRate: number;
  scope: CouponScope;
  isActive: boolean;
}

// 회원 대상 쿠폰 지급 요청
export interface CouponApplyToMemberReq {
  userId: string;
  couponId: string;
}

// 상품 대상 쿠폰 적용 요청
export interface CouponApplyToProductReq {
  itemId?: string;
  couponId: string;
  originalPrice: number;
  itemType: ProductType;
}

// 상품 대상 쿠폰 적용 응답
export interface CouponApplyToProductRes {
  finalPrice: number;
  discountedAmount: number;
  discountRate: number;
}

// 상품에 적용된 쿠폰
export interface AppliedCoupon {
  id: string;
  name: string;
  discountRate: number;
  startDate: string | null;
  endDate: string | null;
}
