import { apiFetch } from "@/util/fetch";
import { toQueryString } from "@/util/query";
import { MemberDetailItem, MemberListReq, MemberListRes } from "./dto/member";

// 회원 목록 조회
export const getMemberList = async (
  req: MemberListReq,
): Promise<MemberListRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(`/users${query ? `?${query}` : ""}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("회원 목록 조회에 실패했습니다.");
  }
};

// 회원 상세 조회
export const getMemberDetail = async (
  id: string,
): Promise<MemberDetailItem> => {
  try {
    const res = await apiFetch(`/users/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("회원 상세 조회에 실패했습니다.");
  }
};
