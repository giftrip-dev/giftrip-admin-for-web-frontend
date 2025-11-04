import { apiFetch } from "@/util/fetch";
import { toQueryString } from "@/util/query";
import {
  CampaignItem,
  CampaignPaginationReq,
  CampaignPaginationRes,
  CampaignCreateReq,
} from "./dto/campaign";

// 체험단 상품 목록 조회
export const getCampaignList = async (
  req: CampaignPaginationReq,
): Promise<CampaignPaginationRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(`/campaigns${query ? `?${query}` : ""}`);
    return res as CampaignPaginationRes;
  } catch (err) {
    console.error(err);
    throw new Error("체험단 상품 목록 조회에 실패했습니다.");
  }
};

// 체험단 상품 상세 조회
export const getCampaignDetail = async (id: string): Promise<CampaignItem> => {
  try {
    const res = await apiFetch(`/campaigns/${id}`);
    return res as CampaignItem;
  } catch (err) {
    console.error(err);
    throw new Error("체험단 상품 상세 조회에 실패했습니다.");
  }
};

// 체험단 상품 삭제
export const deleteCampaignProduct = async (id: string): Promise<void> => {
  try {
    await apiFetch(`/campaigns/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error(err);
    throw new Error("체험단 상품 삭제에 실패했습니다.");
  }
};

// 체험단 상품 생성
export const createCampaignProduct = async (
  data: CampaignCreateReq,
): Promise<void> => {
  try {
    await apiFetch("/campaigns", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
    throw new Error("체험단 상품 생성에 실패했습니다.");
  }
};

// 체험단 상품 수정
export const updateCampaignProduct = async (
  id: string,
  data: CampaignCreateReq,
): Promise<void> => {
  try {
    await apiFetch(`/campaigns/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
    throw new Error("체험단 상품 수정에 실패했습니다.");
  }
};

// 체험단 예약 취소
export const cancelCampaignReservation = async (id: string): Promise<void> => {
  try {
    await apiFetch(`/reservations/campaign/${id}/cancel`, {
      method: "POST",
    });
  } catch (err) {
    console.error(err);
    throw new Error("체험단 예약 취소에 실패했습니다.");
  }
};
