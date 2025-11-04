import { AppliedCoupon } from "./coupon";
import { PaginationMeta } from "./shopping";

// 숙소 상품 카테고리
export enum AccommodationCategory {
  ALL = "all", // 전체
  HOTEL = "hotel", // 호텔
  PENSION = "pension", // 펜션
  PRIVATE_HOUSE = "privateHouse", // 주택
  MOTEL = "motel", // 모텔
  RESORT = "resort", // 리조트
  INN = "inn", // 민박
  CAMPING = "camping", // 캠핑
  GUEST_HOUSE = "guestHouse", // 게스트하우스
}

// 숙소 대분류
export enum AccommodationMainLocation {
  ALL = "all", // 전체
  CAPITAL = "CAPITAL", // 수도권
  GANGWON = "GANGWON", // 강원도
  GYEONGSANG = "GYEONGSANG", // 경상도
  CHUNGCHEONG = "CHUNGCHEONG", // 충청도
  JEOLLA = "JEOLLA", // 전라도
  JEJU = "JEJU", // 제주도
}

// 숙소 소분류
export enum AccommodationSubLocation {
  ALL = "all", // 전체
  SEOUL = "SEOUL", // 서울
  INCHUN = "INCHUN", // 인천
  GAPYEONG = "GAPYEONG", // 가평/남양주/포천
  YONGIN = "YONGIN", // 용인/수원/화성/평택
  PACHUN = "PACHUN", // 파주/고양/김포
  ICHUN = "ICHUN", // 이천/여주/안성/광주
  GANGRI = "GANGRI", // 강릉/속초/양양
  CHUNCHUN = "CHUNCHUN", // 춘천/인제/철원
  PANGCHUN = "PANGCHUN", // 평창/정선/영월
  DONGHAE = "DONGHAE", // 동해/삼척/태백
  HONGCHUN = "HONGCHUN", // 홍천/횡성/원주
  BUSAN = "BUSAN", // 부산
  GEOJU = "GEOJU", // 경주/포항
  DAEGU = "DAEGU", // 대구
  ULSA = "ULSA", // 울산/양산/밀양
  GEJE = "GEJE", // 거제/통영/남해
  DAEJEON = "DAEJEON", // 대전/세종
  CHUNGCHEONG = "CHUNGCHEONG", // 충주/제천/단양
  TAEAN = "TAEAN", // 태안/서산/보령
  BUSEO = "BUSEO", // 부여/공주
  JEONJU = "JEONJU", // 전주/군산
  GANGWON = "GANGWON", // 광주/나주/담양
  MOSAN = "MOSAN", // 여수/순천/보성
  MOKPO = "MOKPO", // 목포/해남/진도
  JEJU = "JEJU", // 제주시
  SEOGUIPO = "SEOGUIPO", // 서귀포시
}

// 숙소 상품 정보
export interface AccommodationItem {
  id: string; // 숙소 상품 ID
  accommodationId: string; // 업체 ID
  createdAt: string; // 생성일자
  updatedAt?: string; // 수정일자
  name: string; // 객실명
  accommodationName: string; // 업체명
  description: string; // 설명
  thumbnailUrl: string; // 썸네일 URL
  accommodationCategory: AccommodationCategory; // 카테고리
  mainLocation: AccommodationMainLocation; // 대분류
  subLocation: AccommodationSubLocation; // 소분류
  checkInTime: string; // 체크인 시간
  checkOutTime: string; // 체크아웃 시간
  availableFrom: string; // 예약 가능 시작일
  availableTo: string; // 예약 가능 종료일
  imageUrls: string[]; // 이미지 URL 목록
  originalPrice: number; // 원가
  finalPrice: number; // 최종 가격
  discountRate: number; // 할인율
  minOccupancy: number; // 최소 인원
  maxOccupancy: number; // 최대 인원
  dailyStock: number; // 일일 재고
  isActive: boolean; // 판매 상태
  appliedCouponId?: string; // 적용된 쿠폰 ID
  memo?: string; // 메모
  managerName: string; // 관리자 이름
  managerPhoneNumber: string; // 관리자 연락처
  relatedLink?: string; // 관련 링크
  itemTags?: string[]; // 태그 목록
  changeInfo: string; // 변경 사항 설명
  appliedCoupon?: AppliedCoupon; // 적용된 쿠폰
}

// 숙소 상품 페이지네이션 요청 정보
export interface AccommodationPaginationReq {
  page: number;
  limit: number;
  category?: AccommodationCategory;
  mainLocation?: AccommodationMainLocation;
  subLocation?: AccommodationSubLocation;
  search?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  isActive?: boolean;
}

// 숙소 상품 페이지네이션 응답 정보
export interface AccommodationPaginationRes {
  items: AccommodationItem[];
  meta: PaginationMeta;
}

// 숙소 상품 생성 요청 정보
export interface AccommodationCreateReq {
  accommodationId: string; // 업체 id
  name: string; // 객실명
  description?: string; // 설명
  imageUrls: string[]; // 객실 이미지 목록
  itemTags?: string[] | null; // 태그 목록
  checkInTime: string; // 체크인 시간
  checkOutTime: string; // 체크아웃 시간
  availableFrom: string; // 예약 가능 시작일
  availableTo: string; // 예약 가능 종료일
  minOccupancy: number; // 최소 인원
  maxOccupancy: number; // 최대 인원
  originalPrice: number; // 원가
  finalPrice: number; // 최종 가격
  dailyStock: number; // 일일 재고
  isActive: boolean; // 판매 상태
  appliedCouponId?: string | null;
}

// 업체 아이템
export interface AccommodationCompanyItem {
  name: string;
  description?: string;
  category: AccommodationCategory;
  mainLocation: AccommodationMainLocation;
  subLocation?: AccommodationSubLocation;
  address1: string;
  address2?: string;
  postalCode?: string;
  managerName: string;
  managerPhoneNumber: string;
  thumbnailUrl: string;
  relatedLink?: string;
  itemTags?: string[];
  inquiryInfo?: string;
  cheapestOriginalPrice: number;
  cheapestFinalPrice: number;
  cheapestDiscountRate: number;
  id: string;
  createdAt: string;
  updatedAt?: string;
}

// 업체 목록 조회 응답
export interface AccommodationCompanyListRes {
  items: AccommodationCompanyItem[];
  meta: PaginationMeta;
}

// 업체 생성 요청
export interface AccommodationCompanyCreateReq {
  mainLocation: AccommodationMainLocation;
  subLocation?: string;
  category: AccommodationCategory;
  address1: string;
  address2?: string;
  postalCode?: string;
  name: string;
  content: string;
  introduction?: string;
  managerName: string;
  managerPhoneNumber?: string;
  itemTags?: string[] | null;
  thumbnailUrl: string;
  relatedLink?: string;
  inquiryInfo?: string;
  changeInfo?: string;
}
