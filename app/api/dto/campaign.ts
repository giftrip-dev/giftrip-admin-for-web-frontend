import { ExposureTag } from "@/constants/product";

// 체험단 상품 카테고리
export enum CampaignCategory {
  ALL = "all",
  INFLUENCER = "influencer", // 인플루언서
  GENERAL = "general", // 일반
  GROUP_BUY = "groupBuy", // 공동구매
}

// 체험단 상품 정보
export interface CampaignItem {
  id: string; // 체험단 상품 ID
  createdAt: string; // 생성일자
  updatedAt: string; // 수정일자
  title: string; // 제목
  description: string; // 설명
  content: string; // 내용
  thumbnailUrl: string; // 썸네일 URL
  category: CampaignCategory; // 카테고리
  address1: string; // 주소1
  address2: string; // 주소2
  originalPrice: number; // 원가
  finalPrice: number; // 최종 가격
  managerName: string; // 담당자 이름
  managerPhoneNumber: string; // 담당자 연락처
  relatedLink?: string; // 관련 링크
  itemTags: string[]; // 상품 태그
  exposureTags: ExposureTag[]; // 노출 태그
  inquiryInfo: string; // 문의 정보
  changeInfo: string; // 변경 정보
  isActive: boolean; // 활성화 여부
  appliedCouponId?: string; // 적용된 쿠폰 ID
  memo?: string; // 메모
}

// 페이지네이션 메타 정보
export interface PaginationMeta {
  currentPage: number; // 현재 페이지
  totalPages: number; // 전체 페이지 수
  totalItems: number; // 전체 아이템 수
  itemsPerPage: number; // 페이지당 아이템 수
}

// 체험단 상품 목록 조회 요청
export interface CampaignPaginationReq {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  exposureTags?: string;
  isActive?: boolean;
}

// 체험단 상품 목록 조회 응답
export interface CampaignPaginationRes {
  items: CampaignItem[]; // 체험단 상품 목록
  meta: PaginationMeta; // 페이지네이션 메타 정보
}

// 체험단 상품 생성 요청
export interface CampaignCreateReq {
  title: string;
  description: string;
  content: string;
  originalPrice: number;
  finalPrice: number;
  thumbnailUrl: string;
  category: CampaignCategory;
  exposureTags: ExposureTag[];
  isActive: boolean;
  appliedCouponId?: string | null;
  managerPhoneNumber?: string | null;
  relatedLink?: string | null;
  itemTags?: string[] | null;
  address1: string;
  changeInfo: string;
  inquiryInfo: string;
}
