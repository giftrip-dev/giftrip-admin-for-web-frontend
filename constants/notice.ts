import { NoticeType } from "@/app/api/dto/notice";

// 게시판 유형 라벨
export const NOTICE_TYPE_LABEL: Record<NoticeType, string> = {
  all: "전체",
  notice: "공지사항",
  event: "이벤트",
};

// 게시판 공개 상태 체크 박스 데이터
export const NOTICE_ACTIVE_ARRAY = [
  { label: "전체", value: "all" },
  { label: "공개", value: "true" },
  { label: "비공개", value: "false" },
];

// 게시판 유형 체크 박스 데이터
export const NOTICE_TYPE_ARRAY = [
  { label: "전체", value: "all" },
  { label: "공지사항", value: NoticeType.NOTICE },
  { label: "이벤트", value: NoticeType.EVENT },
];

// 게시판 유형 (전체 제외)
export const NOTICE_TYPE_PARTIAL = {
  NOTICE: NoticeType.NOTICE,
  EVENT: NoticeType.EVENT,
} as const;
