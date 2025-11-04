import { ExposureTag } from "@/constants/product";
import { AppliedCoupon } from "./coupon";

// 체험 상품 카테고리
export enum ExperienceCategory {
  ALL = "all",
  TRAVEL = "travel", // 여행상품
  RESTAURANT = "restaurant", // 맛집
  CAFE = "cafe", // 카페
  CULTURE_ART = "cultureArt", // 문화예술
  ATTRACTION = "attraction", // 관광지
}

// 체험 상품 정보
export interface ExperienceItem {
  id: string; // 체험 상품 ID
  createdAt: string; // 생성일자
  updatedAt: string; // 수정일자
  title: string; // 제목
  description: string; // 설명
  content: string; // 내용
  thumbnailUrl: string; // 썸네일 URL
  category: ExperienceCategory; // 카테고리
  address1: string; // 주소1
  address2?: string; // 주소2
  availableFrom: string; // 이용 가능 시작일
  availableTo: string; // 이용 가능 종료일
  originalPrice: number; // 원가
  finalPrice: number; // 최종 가격
  discountRate: number; // 할인율
  managerName: string; // 담당자 이름
  managerPhoneNumber: string; // 담당자 연락처
  relatedLink?: string; // 관련 링크
  itemTags: string[]; // 상품 태그
  exposureTags: ExposureTag[]; // 노출 태그
  inquiryInfo: string; // 문의 정보
  changeInfo: string; // 변경 정보
  isActive: boolean; // 활성화 여부
  appliedCouponId?: string; // 적용된 쿠폰 ID
  dailyStock: number; // 당일 재고 수량
  memo?: string; // 관리자 메모
  appliedCoupon?: AppliedCoupon; // 적용된 쿠폰
}

// 페이지네이션 메타 정보
export interface PaginationMeta {
  currentPage: number; // 현재 페이지
  totalPages: number; // 전체 페이지 수
  totalItems: number; // 전체 아이템 수
  itemsPerPage: number; // 페이지당 아이템 수
}

// 체험 상품 목록 조회 요청
export interface ExperiencePaginationReq {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  exposureTag?: string;
  isActive?: boolean;
}

// 체험 상품 목록 조회 응답
export interface ExperiencePaginationRes {
  items: ExperienceItem[]; // 체험 상품 목록
  meta: PaginationMeta; // 페이지네이션 메타 정보
}

// 체험 상품 생성 요청
export interface ExperienceProductCreateReq {
  title: string;
  description: string;
  content: string;
  originalPrice: number;
  finalPrice: number;
  thumbnailUrl: string;
  category: ExperienceCategory;
  exposureTags: ExposureTag[];
  isActive: boolean;
  dailyStock: number;
  appliedCouponId?: string | null;
  managerPhoneNumber?: string | null;
  relatedLink?: string | null;
  itemTags?: string[] | null;
  address1: string;
}
