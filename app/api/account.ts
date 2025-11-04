import { apiFetch } from "@/util/fetch";
import { AccountPostReq, AdminAccount, AdminAccountRes } from "./dto/account";

// 관리자 계정 목록 조회
export const getAccountList = async (
  page: number,
  limit: number,
): Promise<AdminAccountRes> => {
  try {
    const res = await apiFetch(`/admin-users?page=${page}&limit=${limit}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("관리자 계정 목록 조회에 실패했습니다.");
  }
};

// 관리자 계정 상세 조회
export const getAccountDetail = async (
  id: string,
): Promise<() => AdminAccount> => {
  try {
    const res = await apiFetch(`/admin-users/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("관리자 계정 상세 조회에 실패했습니다.");
  }
};

// 관리자 계정 생성
export const postAccount = async (data: AccountPostReq) => {
  try {
    const res = await apiFetch(`/admin-users`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("관리자 계정 생성에 실패했습니다.");
  }
};

// 관리자 계정 비밀번호 초기화
export const patchAccountPassword = async (id: string) => {
  try {
    const res = await apiFetch(`/admin-users/${id}/password`, {
      method: "PUT",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("관리자 계정 비밀번호 초기화에 실패했습니다.");
  }
};

// 관리자 계정 삭제
export const deleteAccount = async (id: string) => {
  try {
    const res = await apiFetch(`/admin-users/${id}`, {
      method: "DELETE",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("관리자 계정 삭제에 실패했습니다.");
  }
};
