import {
  AccommodationMatchingStatus,
  ReservationStatus,
} from "@/app/api/dto/reservation";

export const RESERVATION_STATUS_LABEL: Record<ReservationStatus, string> = {
  [ReservationStatus.ALL]: "전체",
  [ReservationStatus.HELD]: "예약 대기",
  [ReservationStatus.PAID]: "예약 대기",
  [ReservationStatus.CONFIRMED]: "예약 확정",
  [ReservationStatus.CANCELLED]: "예약 취소",
  [ReservationStatus.COMPLETED]: "예약 완료",
  [ReservationStatus.EXPIRED]: "예약 만료",
};

// 예약 상태 배열
export const RESERVATION_STATUS_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "예약 대기",
    value: ReservationStatus.PAID,
  },
  {
    label: "예약 확정",
    value: ReservationStatus.CONFIRMED || ReservationStatus.COMPLETED,
  },
  {
    label: "예약 완료",
    value: ReservationStatus.COMPLETED,
  },
  {
    label: "예약 취소",
    value: ReservationStatus.CANCELLED,
  },
];

// 숙소 매칭 상태 배열
export const ACCOMMODATION_MATCHING_STATUS_ARRAY = [
  {
    label: "전체",
    value: AccommodationMatchingStatus.ALL,
  },
  {
    label: "매칭 대기",
    value: AccommodationMatchingStatus.PENDING,
  },
  {
    label: "매칭 완료",
    value: AccommodationMatchingStatus.MATCHED,
  },
];

// 숙소 매칭 상태 라벨
export const ACCOMMODATION_MATCHING_STATUS_LABEL: Record<
  AccommodationMatchingStatus,
  string
> = {
  [AccommodationMatchingStatus.ALL]: "전체",
  [AccommodationMatchingStatus.PENDING]: "매칭 대기",
  [AccommodationMatchingStatus.MATCHED]: "매칭 완료",
};
