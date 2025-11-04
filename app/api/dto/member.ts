import { OrderItem } from "./order";
import {
  AccommodationReservationItem,
  ExperienceReservationItem,
} from "./reservation";
import { PaginationMeta } from "./shopping";

// 회원 유형
export enum MemberType {
  ALL = "ALL", // 전체
  INFLUENCER = "INFLUENCER", // 인플루언서
  GENERAL = "GENERAL", // 일반
}

// 회원
export interface MemberItem {
  isInfluencer: boolean;
  name?: string;
  email: string;
  nickname?: string;
  phoneNumber?: string;
  isMarketingAgreed: boolean;
  influencerInfo?: {
    platform: string;
    platformId: string;
    platformName?: string;
  };
  registrationMethod: string;
  oauthProvider: string;
  status: string;
  isWithdrawn: boolean;
  registrationType: string;
  id: string;
  createdAt: string;
  updatedAt?: string;
  pointBalance: number;
  couponCount: number;
  adminMemo?: string;
}

// 회원 목록 조회 요청
export interface MemberListReq {
  page: number;
  limit: number;
  search?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  isInfluencer?: boolean | string;
}

// 회원 목록 조회 응답
export interface MemberListRes {
  items: MemberItem[];
  meta: PaginationMeta;
}

// 회원 상세 아이템
export interface MemberDetailItem {
  userInfo: MemberItem;
  pointBalance: number;
  couponCount: number;
  orderList: OrderItem[];
  reservationList: ExperienceReservationItem[] | AccommodationReservationItem[];
}
