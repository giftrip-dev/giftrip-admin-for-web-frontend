import { toQueryString } from "@/util/query";
import {
  DeliveryStatus,
  OrderDetailItem,
  OrderListResponse,
  OrderPaginationReq,
} from "./dto/order";
import { apiFetch } from "@/util/fetch";

// 주문 목록 조회
export const getOrderList = async (
  req: OrderPaginationReq,
): Promise<OrderListResponse> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(`/orders${query ? `?${query}` : ""}`);
    return res as OrderListResponse;
  } catch (err) {
    console.error(err);
    throw new Error("주문 목록 조회에 실패했습니다.");
  }
};

// 주문 상세 조회
export const getOrderDetail = async (id: string): Promise<OrderDetailItem> => {
  try {
    const res = await apiFetch(`/orders/${id}`);
    return res as OrderDetailItem;
  } catch (err) {
    console.error(err);
    throw new Error("주문 상세 조회에 실패했습니다.");
  }
};

// 배송 상태 변경
export const updateOrderStatus = async (
  id: string,
  deliveryStatus: DeliveryStatus,
): Promise<OrderDetailItem> => {
  try {
    const res = await apiFetch(`/orders/${id}/delivery-status`, {
      method: "PUT",
      body: JSON.stringify({ deliveryStatus }),
    });
    return res as OrderDetailItem;
  } catch (err) {
    console.error(err);
    throw new Error("배송 상태 변경에 실패했습니다.");
  }
};

// 주문 취소
export const cancelOrder = async (id: string): Promise<OrderDetailItem> => {
  try {
    const res = await apiFetch(`/orders/${id}/cancel`, {
      method: "POST",
    });
    return res as OrderDetailItem;
  } catch (err) {
    console.error(err);
    throw new Error("주문 취소에 실패했습니다.");
  }
};

// 회원별 주문 목록 조회
export const getMemberOrderList = async (
  memberId: string,
  req: OrderPaginationReq,
): Promise<OrderListResponse> => {
  try {
    const query = toQueryString(req);
    const res = await apiFetch(
      `/orders/user/${memberId}${query ? `?${query}` : ""}`,
    );
    return res as OrderListResponse;
  } catch (err) {
    console.error(err);
    throw new Error("회원별 주문 목록 조회에 실패했습니다.");
  }
};
