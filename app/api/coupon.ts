import {
  CouponApplyToMemberReq,
  CouponCreateReq,
  CouponItem,
  CouponListReq,
  CouponListRes,
  CouponApplyToProductReq,
  CouponApplyToProductRes,
} from "./dto/coupon";
import { apiFetch } from "@/util/fetch";
import { toQueryString } from "@/util/query";

// 쿠폰 목록 조회
export const getCouponList = async (
  req: CouponListReq,
): Promise<CouponListRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(`/coupons${query ? `?${query}` : ""}`);
    return res as CouponListRes;
  } catch (err) {
    console.error(err);
    throw new Error("쿠폰 목록 조회에 실패했습니다.");
  }
};

// 쿠폰 상세 조회
export const getCouponDetail = async (id: string): Promise<CouponItem> => {
  try {
    const res = await apiFetch(`/coupons/${id}`);
    return res as CouponItem;
  } catch (err) {
    console.error(err);
    throw new Error("쿠폰 상세 조회에 실패했습니다.");
  }
};

// 쿠폰 삭제
export const deleteCoupon = async (id: string): Promise<void> => {
  try {
    await apiFetch(`/coupons/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error(err);
    throw new Error("쿠폰 삭제에 실패했습니다.");
  }
};

// 쿠폰 생성
export const createCoupon = async (
  req: CouponCreateReq,
): Promise<CouponItem> => {
  try {
    const res = await apiFetch(`/coupons`, {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res as CouponItem;
  } catch (err) {
    console.error(err);
    throw new Error("쿠폰 생성에 실패했습니다.");
  }
};

// 쿠폰 수정
export const updateCoupon = async (
  id: string,
  req: CouponCreateReq,
): Promise<CouponItem> => {
  try {
    const res = await apiFetch(`/coupons/${id}`, {
      method: "PUT",
      body: JSON.stringify(req),
    });
    return res as CouponItem;
  } catch (err) {
    console.error(err);
    throw new Error("쿠폰 수정에 실패했습니다.");
  }
};

// 회원 대상 쿠폰 지급
export const applyCouponToMember = async (
  req: CouponApplyToMemberReq,
): Promise<void> => {
  try {
    await apiFetch(`/coupons/users/${req.userId}`, {
      method: "POST",
      body: JSON.stringify(req),
    });
  } catch (err) {
    console.error(err);
    throw new Error("회원 대상 쿠폰 지급에 실패했습니다.");
  }
};

// 상품 대상 쿠폰 적용
export const applyCouponToProduct = async (
  req: CouponApplyToProductReq,
): Promise<CouponApplyToProductRes> => {
  try {
    const res = await apiFetch(`/coupons/apply`, {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("상품 대상 쿠폰 적용에 실패했습니다.");
  }
};
