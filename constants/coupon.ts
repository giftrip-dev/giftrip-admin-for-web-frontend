import { CouponScope, CouponType } from "@/app/api/dto/coupon";
import { PRODUCT_TYPES, ProductType } from "./product";

// label 매핑 객체 (쿠폰 카테고리 = 상품 카테고리)
export const COUPON_TYPE_LABEL: Record<CouponType, string> = {
  all: "전체",
  [PRODUCT_TYPES.PRODUCT]: "쇼핑",
  [PRODUCT_TYPES.EXPERIENCE]: "체험",
  [PRODUCT_TYPES.CAMPAIGN]: "체험단",
  [PRODUCT_TYPES.ACCOMMODATION]: "숙박",
};

// 쿠폰 카테고리 셀렉트 박스 데이터
export const COUPON_TYPE_ARRAY = Object.entries(COUPON_TYPE_LABEL).map(
  ([value, label]) => ({
    label,
    value: value as CouponType,
  }),
);

// 쿠폰 카테고리 라벨 매핑 객체 (생성용)
export const COUPON_TYPE_LABEL_CREATE: Record<ProductType, string> = {
  [PRODUCT_TYPES.PRODUCT]: "쇼핑",
  [PRODUCT_TYPES.EXPERIENCE]: "체험",
  [PRODUCT_TYPES.CAMPAIGN]: "체험단",
  [PRODUCT_TYPES.ACCOMMODATION]: "숙박",
};

// 쿠폰 카테고리 셀렉트 박스 데이터 (생성용)
export const COUPON_TYPE_ARRAY_CREATE = Object.entries(
  COUPON_TYPE_LABEL_CREATE,
).map(([value, label]) => ({
  label,
  value: value as CouponType,
}));

// 쿠폰 사용 범위 라벨 매핑 객체
export const COUPON_SCOPE_LABEL: Record<CouponScope, string> = {
  [CouponScope.PRODUCT_REGISTRATION]: "상품 등록",
  [CouponScope.INDIVIDUAL_CUSTOMER]: "고객 제공",
  [CouponScope.ALL_CUSTOMERS]: "전체 고객",
};

// 쿠폰 사용 범위 셀렉트 박스 데이터
export const COUPON_SCOPE_ARRAY = [
  { label: "전체", value: "all" },
  { label: "상품 등록", value: CouponScope.PRODUCT_REGISTRATION },
  { label: "고객 제공", value: CouponScope.INDIVIDUAL_CUSTOMER },
  { label: "전체 고객", value: CouponScope.ALL_CUSTOMERS },
];

// 쿠폰 사용 범위 셀렉트 박스 데이터 (생성용)
export const COUPON_SCOPE_ARRAY_CREATE = [
  { label: "상품 등록", value: CouponScope.PRODUCT_REGISTRATION },
  { label: "고객 제공", value: CouponScope.INDIVIDUAL_CUSTOMER },
  { label: "전체 고객", value: CouponScope.ALL_CUSTOMERS },
];

// 쿠폰 유효 상태 체크 박스 데이터
export const COUPON_ACTIVE_ARRAY = [
  { label: "전체", value: "all" },
  { label: "활성화", value: "true" },
  { label: "비활성화", value: "false" },
];

// 쿠폰 활성화 여부 체크 박스 데이터 (생성용)
export const COUPON_ACTIVE_ARRAY_CREATE = [
  { label: "활성화", value: "true" },
  { label: "비활성화", value: "false" },
];

// 쿠폰 만료 여부 체크 박스 데이터
export const COUPON_EXPIRED_ARRAY = [
  { label: "전체", value: "all" },
  { label: "만료", value: "true" },
  { label: "유효", value: "false" },
];

// 쿠폰 유효 기간 체크 박스 데이터
export const COUPON_HAS_PERIOD_ARRAY = [
  { label: "기간 없음", value: "false" },
  { label: "기간 있음", value: "true" },
];
