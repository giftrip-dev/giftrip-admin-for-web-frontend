import { apiFetch } from "@/util/fetch";
import { PointApplyReq } from "./dto/point";

// 포인트 지급
export const applyPoint = async (req: PointApplyReq): Promise<void> => {
  try {
    await apiFetch(`/points/give`, {
      method: "POST",
      body: JSON.stringify(req),
    });
  } catch (err) {
    console.error(err);
    throw new Error("포인트 지급에 실패했습니다.");
  }
};
