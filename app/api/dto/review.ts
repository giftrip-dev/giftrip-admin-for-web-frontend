import { ProductType } from "@/constants/product";
import { PaginationMeta } from "./shopping";

// 리뷰 아이템
export interface ReviewItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
  userName: string;
  userEmail?: string;
  itemType: string;
  targetId: string;
  orderItemId: string;
  itemName: string;
  thumbnailUrl: string;
  purchasedAt: string;
  rating: number;
  content: string;
  isActive: boolean;
  imageUrls?: string[];
  adminComment: string | null;
}

// 리뷰 목록 조회 응답
export interface ReviewListRes {
  items: ReviewItem[];
  meta: PaginationMeta;
}

// 리뷰 목록 조회 요청
export interface ReviewListReq {
  page: number;
  limit: number;
  itemType: ProductType;
  search?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  isActive?: boolean | "all";
}
