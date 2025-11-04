import { apiFetch, CustomError } from "@/util/fetch";
import { toQueryString } from "@/util/query";
import {
  ExperienceItem,
  ExperiencePaginationReq,
  ExperiencePaginationRes,
  ExperienceProductCreateReq,
} from "./dto/experience";

// 체험 상품 목록 조회
export const getExperienceList = async (
  req: ExperiencePaginationReq,
): Promise<ExperiencePaginationRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(`/experiences${query ? `?${query}` : ""}`);
    return res as ExperiencePaginationRes;
  } catch (err) {
    console.error(err);
    throw new Error("체험 상품 목록 조회에 실패했습니다.");
  }
};

// 체험 상품 상세 조회
export const getExperienceDetail = async (
  id: string,
): Promise<ExperienceItem> => {
  try {
    const res = await apiFetch(`/experiences/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("체험 상품 상세 조회에 실패했습니다.");
  }
};

// 체험 상품 생성
export const createExperienceProduct = async (
  req: ExperienceProductCreateReq,
) => {
  try {
    const res = await apiFetch("/experiences", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("체험 상품 생성에 실패했습니다.");
  }
};

// 여행 상품 수정
export const updateExperienceProduct = async (
  id: string,
  req: ExperienceProductCreateReq,
) => {
  try {
    const res = await apiFetch(`/experiences/${id}`, {
      method: "PUT",
      body: JSON.stringify(req),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("여행 상품 수정에 실패했습니다.");
  }
};

// 체험 상품 삭제
export const deleteExperienceProduct = async (id: string) => {
  try {
    const res = await apiFetch(`/experiences/${id}`, {
      method: "DELETE",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("체험 상품 삭제에 실패했습니다.");
  }
};

// 체험 상품 취소
export const cancelExperienceProduct = async (
  id: string,
): Promise<CustomError | void> => {
  try {
    const res = await apiFetch(`/reservations/experience/${id}/cancel`, {
      method: "POST",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err as CustomError;
  }
};
