import { apiFetch } from "@/util/fetch";
import { toQueryString } from "@/util/query";
import {
  ShoppingCreateReq,
  ShoppingItem,
  ShoppingPaginationReq,
  ShoppingPaginationRes,
} from "./dto/shopping";

// 쇼핑 상품 목록 조회
export const getShoppingList = async (
  req: ShoppingPaginationReq,
): Promise<ShoppingPaginationRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(`/products${query ? `?${query}` : ""}`);
    return res as ShoppingPaginationRes;
  } catch (err) {
    console.error(err);
    throw new Error("쇼핑 상품 목록 조회에 실패했습니다.");
  }
};

// 쇼핑 상품 상세 조회
export const getShoppingDetail = async (id: string): Promise<ShoppingItem> => {
  try {
    const res = await apiFetch(`/products/${id}`);
    return res as ShoppingItem;
  } catch (err) {
    console.error(err);
    throw new Error("쇼핑 상품 상세 조회에 실패했습니다.");
  }
};

// 쇼핑 상품 삭제
export const deleteShoppingProduct = async (id: string): Promise<void> => {
  try {
    await apiFetch(`/products/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error(err);
    throw new Error("쇼핑 상품 삭제에 실패했습니다.");
  }
};

// 쇼핑 상품 생성
export const createShoppingProduct = async (
  data: ShoppingCreateReq,
): Promise<void> => {
  try {
    await apiFetch("/products", { method: "POST", body: JSON.stringify(data) });
  } catch (err) {
    console.error(err);
    throw new Error("쇼핑 상품 생성에 실패했습니다.");
  }
};

// 쇼핑 상품 수정
export const updateShoppingProduct = async (
  id: string,
  data: ShoppingCreateReq,
): Promise<void> => {
  try {
    await apiFetch(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
    throw new Error("쇼핑 상품 수정에 실패했습니다.");
  }
};
