import { PaginationMeta } from "./shopping";

// 게시판 타입
export enum NoticeType {
  NOTICE = "notice",
  EVENT = "event",
  ALL = "all",
}

// 게시판 아이템
export interface NoticeItem {
  type: NoticeType;
  title: string;
  content: string;
  description: string;
  thumbnailUrl: string;
  isActive: boolean;
  id: string;
  createdAt: string;
  updatedAt?: string;
}

// 게시판 목록 조회 응답
export interface NoticeListRes {
  items: NoticeItem[];
  meta: PaginationMeta;
}

// 게시판 리스트 조회 요청
export type NoticePaginationReq = {
  page: number;
  limit: number;
  isActive?: boolean | "all";
  createdAtStart?: string;
  createdAtEnd?: string;
  type?: NoticeType | "all";
  search?: string;
};

// 게시판 생성 요청
export type NoticeCreateReq = {
  title: string;
  type: NoticeType;
  content: string;
  thumbnailUrl: string | File;
  isActive: boolean | "true" | "false";
};

// 이벤트 생성 요청
export type EventCreateReq = {
  title: string;
  type: NoticeType;
  content: string;
  isActive: boolean | "true" | "false";
};
