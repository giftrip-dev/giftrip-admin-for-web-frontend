import { PRODUCT_TYPES, ProductType } from "@/constants/product";
import { PaginationMeta } from "./shopping";

// 배너 타입
export enum BannerType {
  MAIN = "main",
  SUB = "sub",
}

// 배너 카테고리 (전체 제외)
export const BANNER_CATEGORY_PARTIAL = {
  EXPERIENCE: PRODUCT_TYPES.EXPERIENCE, // 체험
  CAMPAIGN: PRODUCT_TYPES.CAMPAIGN, // 체험단
  PRODUCT: PRODUCT_TYPES.PRODUCT, // 쇼핑
  ACCOMMODATION: PRODUCT_TYPES.ACCOMMODATION, // 숙박
  HOME: "home", // 홈
} as const;

// 배너 카테고리
export const BANNER_CATEGORY = {
  ...BANNER_CATEGORY_PARTIAL,
  ALL: "all",
} as const;

export type BannerCategory =
  (typeof BANNER_CATEGORY)[keyof typeof BANNER_CATEGORY];

// 배너 아이템
export type BannerItem = {
  id: string;
  title: string;
  itemType: BannerCategory;
  type: BannerType;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
};

// 배너 출력 순서
export enum BannerOrder {
  ASC = "ASC",
  DESC = "DESC",
}

// 배너 리스트 조회 요청
export type BannerPaginationReq = {
  page: number;
  limit: number;
  isActive?: boolean;
  createdAtStart?: string;
  createdAtEnd?: string;
  orderDirection?: BannerOrder | "all";
  type?: BannerType;
  itemType?: BannerCategory;
  search?: string;
};

// 배너 리스트 응답
export type BannerListRes = {
  items: BannerItem[];
  meta: PaginationMeta;
};

// 배너 아이템 타입
export type BannerItemType = ProductType | "home";

// 배너 생성 요청
export type BannerCreateReq = {
  title: string;
  itemType: BannerCategory;
  type: BannerType;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
};

// 서브 배너 생성 요청
export type SubBannerCreateReq = {
  title: string;
  displayOrder: number;
  type: BannerType;
  isActive: boolean;
  imageUrl: string;
};
