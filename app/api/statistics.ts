import { apiFetch } from "@/util/fetch";
import { StatisticsResponse } from "./dto/statistics";

// 통계 조회
export const getStatistics = async (): Promise<StatisticsResponse> => {
  try {
    const res = await apiFetch(`/statistics`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("통계 조회에 실패했습니다.");
  }
};

