// 홈 진열 유형 (exposure tag)
export enum ExposureTag {
  NEW = "new",
  BEST = "best",
  TIME_DEAL = "timeDeal",
  NONE = "null",
}

// 홈 진열 유형 라벨
export const EXPOSURE_TAG_LABEL = {
  [ExposureTag.NEW]: "NEW",
  [ExposureTag.BEST]: "BEST",
  [ExposureTag.TIME_DEAL]: "타임 특가",
  [ExposureTag.NONE]: "진열 안함",
};

// 상품 타입
export const PRODUCT_TYPES = {
  PRODUCT: "product", // 쇼핑 상품
  EXPERIENCE: "experience", // 체험 상품
  CAMPAIGN: "campaign", // 체험단
  ACCOMMODATION: "accommodation", // 숙소
} as const;

// 상품 타입 라벨
export const PRODUCT_TYPES_LABEL = {
  [PRODUCT_TYPES.PRODUCT]: "쇼핑",
  [PRODUCT_TYPES.EXPERIENCE]: "체험",
  [PRODUCT_TYPES.CAMPAIGN]: "체험단",
  [PRODUCT_TYPES.ACCOMMODATION]: "숙소",
} as const;

// 상품 타입
export type ProductType = (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];

// 홈 진열 유형 셀렉트 박스 배열
export const EXPOSURE_TAG_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "NEW",
    value: ExposureTag.NEW,
  },
  {
    label: "BEST",
    value: ExposureTag.BEST,
  },
  {
    label: "타임 특가",
    value: ExposureTag.TIME_DEAL,
  },
  {
    label: "진열 안함",
    value: ExposureTag.NONE,
  },
];

// 홈 진열 유형 일부 배열 (전체 제외)
export const EXPOSURE_TAG_PARTIAL_ARRAY = EXPOSURE_TAG_ARRAY.filter(
  (item) => item.value !== "all",
);

// 상품 판매 상태 셀렉트 박스 배열
export const PRODUCT_SALE_STATUS_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "판매 중",
    value: "true",
  },
  {
    label: "판매 중지",
    value: "false",
  },
];
