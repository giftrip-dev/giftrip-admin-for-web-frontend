import { ProductType } from "@/constants/product";
import { AccommodationCategory } from "./accommodation";
import { CampaignCategory } from "./campaign";
import { ExperienceCategory } from "./experience";
import { PaymentMethod, PaymentStatus } from "./order";
import { PaginationMeta } from "./shopping";

// 예약 상태
export enum ReservationStatus {
  ALL = "all",
  HELD = "held",
  PAID = "paid",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  EXPIRED = "expired",
}

// 숙소 매칭 상태
export enum AccommodationMatchingStatus {
  ALL = "all",
  PENDING = "pending",
  MATCHED = "matched",
}

// 체험 예약 아이템
export interface ExperienceReservationItem {
  quantity: number; // 구매 수량
  category: ExperienceCategory;
  reservationNumber: string;
  itemTitle: string;
  status: ReservationStatus;
  experienceDate: string;
  guestName: string; // 이용자 이름
  guestPhoneNumber: string; // 이용자 연락처
  ordererName: string; // 예약자 이름
  ordererPhoneNumber: string; // 예약자 연락처
  userName?: string; // 이용자 이름
  userPhoneNumber?: string; // 이용자 연락처
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paidAmount: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  adminMemo?: string;
  description?: string;
  managerPhoneNumber?: string;
  relatedLink?: string;
  location?: string;
}

// 체험단 예약 아이템
export interface CampaignReservationItem {
  purchaseCount: number; // 구매 수량
  category: CampaignCategory;
  reservationNumber: string;
  itemTitle: string;
  status: ReservationStatus;
  experienceDate: string;
  ordererName: string; // 예약자 이름
  ordererPhoneNumber: string; // 예약자 연락처
  userName?: string; // 이용자 이름
  userPhoneNumber?: string; // 이용자 연락처
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paidAmount: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  adminMemo?: string;
  description?: string;
  managerPhoneNumber?: string;
  relatedLink?: string;
  address: string;
}

// 체험 예약 목록 조회 요청
export interface ExperienceReservationListReq {
  page: number; // 페이지
  limit: number; // 페이지당 아이템 수
  search?: string; // 검색어
  status?: ReservationStatus | "all"; // 예약 상태
  category?: ExperienceCategory | "all"; // 카테고리
  experienceDateStart?: string; // 체험 날짜 시작
  experienceDateEnd?: string; // 체험 날짜 종료
}

// 체험 예약 목록 조회 응답
export interface ExperienceReservationListRes {
  items: ExperienceReservationItem[];
  meta: PaginationMeta;
}

// 체험단 예약 목록 조회 요청
export interface CampaignReservationListReq {
  page: number;
  limit: number;
  search?: string;
  status?: ReservationStatus | "all";
  category?: CampaignCategory | "all";
  experienceDateStart?: string; // 체험 날짜 시작
  experienceDateEnd?: string; // 체험 날짜 종료
}

// 체험단 예약 목록 조회 응답
export interface CampaignReservationListRes {
  items: CampaignReservationItem[];
  meta: PaginationMeta;
}
// 숙소 예약 아이템
export interface AccommodationReservationItem {
  category: AccommodationCategory;
  accommodationName: string;
  roomName: string;
  reservationNumber: string;
  ordererName: string; // 예약자 이름
  ordererPhoneNumber: string; // 예약자 연락처
  guestName: string; // 이용자 이름
  guestPhoneNumber: string; // 이용자 연락처
  guestCount: number; // 수량
  checkInDate: string;
  checkOutDate: string;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paidAmount: number;
  userId: string;
  id: string;
  createdAt: string;
  updatedAt?: string;
  accommodationMatchingStatus: AccommodationMatchingStatus;
  adminMemo?: string;
  managerPhoneNumber?: string;
  relatedLink?: string;
}

// 숙소 예약 목록 조회 응답
export interface AccommodationReservationListRes {
  items: AccommodationReservationItem[];
  meta: PaginationMeta;
}

// 숙소 예약 목록 조회 요청
export interface AccommodationReservationListReq {
  page: number;
  limit: number;
  search?: string;
  status?: ReservationStatus | "all";
  matchingStatus?: AccommodationMatchingStatus | "all";
  category?: AccommodationCategory | "all";
  checkInDateStart?: string;
  checkInDateEnd?: string;
}

// 회원별 예약 아이템
export interface MemberReservationItem {
  reservationNumber: string;
  itemType: ProductType;
  status: ReservationStatus;
  itemTitle: string;
  ordererName: string;
  ordererPhoneNumber: string;
  guestName: string;
  guestPhoneNumber: string;
  guestCount: number;
  experienceDate: string;
  checkInDate: string;
  checkOutDate: string;
  paymentStatus: PaymentStatus;
  paidAmount: number;
  paymentMethod: PaymentMethod;
  id: string;
  createdAt: string;
  updatedAt: string;
}

// 회원별 예약 목록 조회 응답
export interface MemberReservationListRes {
  items: MemberReservationItem[];
  meta: PaginationMeta;
}
