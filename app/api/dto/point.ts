// 포인트 지급 요청
export interface PointApplyReq {
  userId: string;
  amount: number;
  description?: string;
}
