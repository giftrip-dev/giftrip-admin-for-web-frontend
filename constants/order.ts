import {
  DeliveryStatus,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/app/api/dto/order";

// 결제 수단 매핑 객체
export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  [PaymentMethod.CREDIT_CARD]: "신용카드",
  [PaymentMethod.NAVER_PAY]: "네이버페이",
  [PaymentMethod.BANK_TRANSFER]: "계좌이체",
  [PaymentMethod.TOSS_PAY]: "토스페이",
  [PaymentMethod.KAKAO_PAY]: "카카오페이",
  [PaymentMethod.PHONE_PAY]: "휴대폰 결제",
  [PaymentMethod.VIRTUAL_ACCOUNT]: "가상계좌",
  [PaymentMethod.MOBILE]: "모바일 결제",
};

// 주문 상태 매핑 객체
export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  [OrderStatus.HELD]: "주문 대기",
  [OrderStatus.PAID]: "결제 완료",
  [OrderStatus.CONFIRMED]: "주문 확정",
  [OrderStatus.COMPLETED]: "주문 완료",
  [OrderStatus.CANCELED]: "주문 취소",
  [OrderStatus.REFUNDED]: "환불 완료",
};

// 결제 상태 매핑 객체
export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: "결제 대기",
  [PaymentStatus.SUCCESS]: "결제 완료",
  [PaymentStatus.FAILED]: "결제 실패",
  [PaymentStatus.CANCELED]: "결제 취소",
  [PaymentStatus.REFUNDED]: "환불 완료",
};

// 배송 상태 매핑 객체
export const DELIVERY_STATUS_LABEL: Record<DeliveryStatus, string> = {
  [DeliveryStatus.PENDING]: "상품 준비 중",
  [DeliveryStatus.SHIPPED]: "출고 완료",
  [DeliveryStatus.DELIVERED]: "배송 완료",
  [DeliveryStatus.RETURNED]: "반품",
  [DeliveryStatus.CANCELED]: "취소",
};

// 배송 상태 배열
export const DELIVERY_STATUS_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "상품 준비중",
    value: DeliveryStatus.PENDING,
  },
  {
    label: "출고 완료",
    value: DeliveryStatus.SHIPPED,
  },
];
