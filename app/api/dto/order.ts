import { ProductType } from "@/constants/product";
import { PaginationMeta, ShoppingCategory } from "./shopping";

// 결제 수단
export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  NAVER_PAY = "naver_pay",
  BANK_TRANSFER = "bank_transfer",
  TOSS_PAY = "toss_pay",
  KAKAO_PAY = "kakao_pay",
  PHONE_PAY = "phone_pay",
  VIRTUAL_ACCOUNT = "virtual_account",
  MOBILE = "mobile",
}

// 배송 상태
export enum DeliveryStatus {
  PENDING = "pending", // 상품 준비중
  SHIPPED = "shipped", // 출고
  DELIVERED = "delivered", // 배송완료
  RETURNED = "returned", // 반품
  CANCELED = "canceled", // 취소
}

// 주문 상태
export enum OrderStatus {
  HELD = "held",
  PAID = "paid",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELED = "canceled",
  REFUNDED = "refunded",
}
// 결제 상태
export enum PaymentStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  CANCELED = "canceled",
  REFUNDED = "refunded",
}

// 주문 아이템
export interface OrderItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  deliveryStatus: DeliveryStatus;
  paymentStatus: PaymentStatus;
  itemType: ProductType;
  itemTitle: string;
  orderDate: string;
  totalOriginalPrice: number;
  totalFinalPrice: number;
  totalDiscountAmount: number;
  deliveryFee: number;
  finalPaymentAmount: number;
  ordererName: string;
  ordererPhoneNumber: string;
  cancelReason: string;
  itemCount: number;
  paidAmount: number;
  hasDiscount: boolean;
  isPaid: boolean;
  canCancel: boolean;
  hasExpired: boolean;
  expireAt: string;
}

// 주문 상세 아이템 (주문 아이템 + 수량)
export interface OrderDetailOrderItem extends OrderItem {
  quantity: number;
  manufacturer?: string;
  relatedLink?: string;
  description?: string;
  category: ShoppingCategory;
  managerPhoneNumber?: string;
}

// 주문 상세
export interface OrderDetailItem extends OrderItem {
  adminMemo?: string;
  paymentMethod: PaymentMethod;
  deliveryStatus: DeliveryStatus;
  orderItems: OrderDetailOrderItem[];
  address1: string;
  address2?: string;
}

// 주문 목록 응답
export interface OrderListResponse {
  items: OrderItem[];
  meta: PaginationMeta;
}

// 주문 목록 요청
export interface OrderPaginationReq {
  page: number;
  limit: number;
  search?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  deliveryStatus?: string;
}
