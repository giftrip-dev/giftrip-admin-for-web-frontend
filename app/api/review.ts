import { toQueryString } from "@/util/query";
import { ReviewListRes, ReviewListReq } from "./dto/review";
import { apiFetch } from "@/util/fetch";

// 리뷰 목록 조회
export const getReviewList = async (
  req: ReviewListReq,
): Promise<ReviewListRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(`/reviews${query ? `?${query}` : ""}`);
    return res as ReviewListRes;
  } catch (err) {
    console.error(err);
    throw new Error("리뷰 목록 조회에 실패했습니다.");
  }
};

// 리뷰 상세 조회
export const getReviewDetail = async (id: string) => {
  try {
    const res = await apiFetch(`/reviews/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("리뷰 상세 조회에 실패했습니다.");
  }
};

// 리뷰 삭제
export const deleteReview = async (id: string) => {
  try {
    const res = await apiFetch(`/reviews/${id}`, { method: "DELETE" });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("리뷰 삭제에 실패했습니다.");
  }
};

// 리뷰 상태 변경
export const updateReviewStatus = async (id: string, isActive: boolean) => {
  try {
    const res = await apiFetch(`/reviews/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isActive }),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("리뷰 상태 변경에 실패했습니다.");
  }
};
