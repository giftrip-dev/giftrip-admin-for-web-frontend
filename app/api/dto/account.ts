import { AdminRole } from "./auth";
import { PaginationMeta } from "./shopping";

// 관리자 계정
export interface AdminAccount {
  id: string; // id
  createdAt: string; // 생성일자
  isActive: boolean; // 활성화 여부
  loginId: string; // 로그인 아이디
  role: AdminRole; // 계정 유형
  name: string; // 관리자 이름
}

// 관리자 계정 조회 응답
export interface AdminAccountRes {
  items: AdminAccount[];
  meta: PaginationMeta;
}

// 관리자 계정 생성 요청
export interface AccountPostReq {
  loginId: string; // 로그인 아이디
  password: string; // 비밀번호
  name: string; // 관리자 이름
}
