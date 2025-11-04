import { BannerCategory, BannerOrder } from "@/app/api/dto/banner";
import { PRODUCT_TYPES } from "./product";

// 배너 카테고리 매핑 객체
export const BANNER_CATEGORY_LABEL: Record<BannerCategory, string> = {
  all: "전체",
  home: "홈",
  [PRODUCT_TYPES.EXPERIENCE]: "체험",
  [PRODUCT_TYPES.CAMPAIGN]: "체험단",
  [PRODUCT_TYPES.PRODUCT]: "쇼핑",
  [PRODUCT_TYPES.ACCOMMODATION]: "숙박",
};

// 배너 카테고리 셀렉트 박스 데이터
export const BANNER_CATEGORY_ARRAY = Object.entries(BANNER_CATEGORY_LABEL).map(
  ([value, label]) => ({
    label,
    value: value as BannerCategory,
  }),
);

// 배너 출력 순서 체크 박스 데이터
export const BANNER_ORDER_ARRAY = [
  { label: "선택 안함", value: "all" },
  { label: "높은순", value: BannerOrder.ASC },
  { label: "낮은순", value: BannerOrder.DESC },
];

// 배너 출력 순서 체크 박스 데이터(생성용)
export const BANNER_ORDER_ARRAY_CREATE = [
  { label: "높은순", value: BannerOrder.ASC },
  { label: "낮은순", value: BannerOrder.DESC },
];

// 배너 공개 상태 체크 박스 데이터
export const BANNER_ACTIVE_ARRAY = [
  { label: "전체", value: "all" },
  { label: "공개", value: "true" },
  { label: "비공개", value: "false" },
];

// 배너 공개 상태 체크 박스 데이터(생성용)
export const BANNER_ACTIVE_ARRAY_CREATE = [
  { label: "공개", value: "true" },
  { label: "비공개", value: "false" },
];
