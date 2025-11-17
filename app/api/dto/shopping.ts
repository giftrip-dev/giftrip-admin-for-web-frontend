import { ExposureTag } from "@/constants/product";
import { AppliedCoupon } from "./coupon";

// 쇼핑 상품 카테고리
export enum ShoppingCategory {
  ALL = "all", // 전체
  TRAVEL = "travel", // 맛집
  SPECIALITY = "speciality", // 특산물
  LOCAL = "local", // 지역특산품
  SOUVENIR = "souvenir", // 기념품
  FOOD = "food", // 음식
  HEALTH_FOOD = "healthFood", // 건강식품
  LIVING_STATIONERY = "livingStationery", // 생활용품
  KITCHEN = "kitchen", // 주방용품
  FURNITURE_ELECTRONICS = "furnitureElectronics", // 가구/전자제품
  MEDICAL_BEAUTY = "medicalBeauty", // 의료/뷰티
  OTHERS = "others", // 기타
}

// 쇼핑 상품 정보
export interface ShoppingItem {
  id: string; // 쇼핑 상품 ID
  createdAt: string; // 생성일자
  updatedAt?: string; // 수정일자
  name: string; // 제목
  description: string; // 설명
  content: string; // 내용
  thumbnailUrl: string; // 썸네일 URL
  category: ShoppingCategory; // 카테고리
  manufacturer: string; // 제조사
  origin: string; // 원산지
  managerPhoneNumber: string; // 담당자 연락처
  originalPrice: number; // 원가
  finalPrice: number; // 최종 가격
  isSoldOut: boolean; // 품절 여부
  isOptionUsed: boolean; // 옵션 사용 여부
  stockCount: number | null; // 재고 수량
  options?: ShoppingOption[]; // 옵션 목록
  rating: string; // 평점
  isOrderQuantityLimited: boolean; // 주문 수량 제한 여부
  maxOrderQuantity: number | null; // 최대 주문 수량
  reviewCount: number; // 리뷰 수
  itemTags: string[]; // 상품 태그
  exposureTags: ExposureTag[]; // 노출 태그
  relatedLink?: string; // 관련 링크
  hasDiscount: boolean; // 할인 여부
  isAvailableToPurchase: boolean; // 구매 가능 여부
  inquiryInfo?: string; // 문의 사항
  memo?: string; // 메모
  isActive: boolean; // 판매 상태
  changeInfo: string; // 취소 및 환불 사항
  appliedCoupon?: AppliedCoupon;
}

// 쇼핑 상품 옵션 정보
export interface ShoppingOption {
  seq: number; // 옵션 순번
  name: string; // 옵션 이름
  price: number; // 옵션 가격
  stockCount: number; // 재고 수량
}

// 페이지네이션 메타 정보
export interface PaginationMeta {
  currentPage: number; // 현재 페이지
  totalPages: number; // 전체 페이지 수
  totalItems: number; // 전체 아이템 수
  itemsPerPage: number; // 페이지당 아이템 수
}

// 쇼핑 상품 목록 조회 요청
export interface ShoppingPaginationReq {
  page: number;
  limit: number;
  category?: ShoppingCategory;
  search?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  exposureTag?: string;
  isActive?: boolean;
}

// 쇼핑 상품 목록 조회 응답
export interface ShoppingPaginationRes {
  items: ShoppingItem[]; // 쇼핑 상품 목록
  meta: PaginationMeta; // 페이지네이션 메타 정보
}

// 쇼핑 상품 생성 요청
export interface ShoppingCreateReq {
  options?: ShoppingOption[];
  category: ShoppingCategory;
  itemTags?: string[];
  name: string;
  description: string;
  thumbnailUrl: string;
  content: string;
  manufacturer: string;
  origin: string;
  managerPhoneNumber?: string | null;
  originalPrice: number;
  finalPrice: number;
  isActive: boolean;
  isOptionUsed: boolean;
  stockCount?: number | null;
  appliedCouponId?: string | null;
  memo?: string | null;
  exposureTags?: ExposureTag[];
  relatedLink?: string | null;
}
