import { apiFetch, CustomError } from "@/util/fetch";
import { toQueryString } from "@/util/query";
import {
  AccommodationPaginationReq,
  AccommodationPaginationRes,
  AccommodationItem,
  AccommodationCreateReq,
  AccommodationCompanyCreateReq,
  AccommodationCompanyListRes,
  AccommodationCompanyItem,
} from "./dto/accommodation";
import { AccommodationReservationListReq } from "./dto/reservation";

// 숙소 상품 목록 조회
export const getAccommodationList = async (
  req: AccommodationPaginationReq,
): Promise<AccommodationPaginationRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(
      `/accommodations/rooms${query ? `?${query}` : ""}`,
    );
    return res as AccommodationPaginationRes;
  } catch (err) {
    console.error(err);
    throw new Error("체험단 상품 목록 조회에 실패했습니다.");
  }
};

// 숙소 상품 상세 조회
export const getAccommodationDetail = async (
  id: string,
): Promise<AccommodationItem> => {
  try {
    const res = await apiFetch(`/accommodations/rooms/${id}`);
    return res as AccommodationItem;
  } catch (err) {
    console.error(err);
    throw new Error("숙소 상품 상세 조회에 실패했습니다.");
  }
};

// 숙소 상품 삭제
export const deleteAccommodationProduct = async (id: string): Promise<void> => {
  try {
    await apiFetch(`/accommodations/rooms/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error(err);
    throw new Error("숙소 상품 삭제에 실패했습니다.");
  }
};

// 숙소 상품 생성
export const createAccommodationProduct = async (
  data: AccommodationCreateReq,
): Promise<void> => {
  try {
    await apiFetch("/accommodations/rooms", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
    throw new Error("숙소 상품 생성에 실패했습니다.");
  }
};

// 객실 상품 수정
export const updateAccommodationProduct = async (
  id: string,
  data: AccommodationCreateReq,
): Promise<void> => {
  try {
    await apiFetch(`/accommodations/rooms/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
    throw new Error("숙소 상품 수정에 실패했습니다.");
  }
};

// 업체 생성 요청
export const createAccommodationCompany = async (
  data: AccommodationCompanyCreateReq,
): Promise<void> => {
  try {
    await apiFetch("/accommodations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
    throw new Error("업체 생성에 실패했습니다.");
  }
};

// 업체 목록 조회
export const getAccommodationCompanyList = async (
  req: AccommodationReservationListReq,
): Promise<AccommodationCompanyListRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(`/accommodations${query ? `?${query}` : ""}`);
    return res as AccommodationCompanyListRes;
  } catch (err) {
    console.error(err);
    throw new Error("업체 목록 조회에 실패했습니다.");
  }
};

// 숙소 예약 취소
export const cancelAccommodationReservation = async (
  id: string,
): Promise<CustomError | void> => {
  try {
    await apiFetch(`/reservations/accommodation/${id}/cancel`, {
      method: "POST",
    });
  } catch (err) {
    console.error(err);
    throw err as CustomError;
  }
};

// 업체 상세 조회
export const getAccommodationCompanyDetail = async (
  id: string,
): Promise<AccommodationCompanyItem> => {
  try {
    const res = await apiFetch(`/accommodations/${id}`);
    return res as AccommodationCompanyItem;
  } catch (err) {
    console.error(err);
    throw new Error("업체 상세 조회에 실패했습니다.");
  }
};
