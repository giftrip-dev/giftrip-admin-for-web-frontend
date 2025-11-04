import { apiFetch } from "@/util/fetch";
import { toQueryString } from "@/util/query";
import {
  BannerCreateReq,
  BannerItem,
  BannerListRes,
  BannerPaginationReq,
  SubBannerCreateReq,
} from "./dto/banner";

// 배너 목록 조회
export const getBannerList = async (
  req: BannerPaginationReq,
): Promise<BannerListRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(`/banners${query ? `?${query}` : ""}`);
    return res as BannerListRes;
  } catch (err) {
    console.error(err);
    throw new Error("배너 목록 조회에 실패했습니다.");
  }
};

// 배너 상세 조회
export const getBannerDetail = async (id: string): Promise<BannerItem> => {
  try {
    const res = await apiFetch(`/banners/${id}`);
    return res as BannerItem;
  } catch (err) {
    console.error(err);
    throw new Error("배너 상세 조회에 실패했습니다.");
  }
};

// 배너 삭제
export const deleteBanner = async (id: string): Promise<void> => {
  try {
    await apiFetch(`/banners/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error(err);
    throw new Error("배너 삭제에 실패했습니다.");
  }
};

// 배너 생성
export const createBanner = async (
  req: BannerCreateReq | SubBannerCreateReq,
): Promise<BannerItem> => {
  try {
    const res = await apiFetch(`/banners`, {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res as BannerItem;
  } catch (err) {
    console.error(err);
    throw new Error("배너 생성에 실패했습니다.");
  }
};

// 배너 수정
export const updateBanner = async (
  id: string,
  req: BannerCreateReq | SubBannerCreateReq,
): Promise<BannerItem> => {
  try {
    const res = await apiFetch(`/banners/${id}`, {
      method: "PUT",
      body: JSON.stringify(req),
    });
    return res as BannerItem;
  } catch (err) {
    console.error(err);
    throw new Error("배너 수정에 실패했습니다.");
  }
};
