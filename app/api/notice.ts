import { toQueryString } from "@/util/query";
import {
  EventCreateReq,
  NoticeCreateReq,
  NoticeItem,
  NoticeListRes,
  NoticePaginationReq,
} from "./dto/notice";
import { apiFetch } from "@/util/fetch";

// 게시판 목록 조회
export const getNoticeList = async (
  req: NoticePaginationReq,
): Promise<NoticeListRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(`/notices${query ? `?${query}` : ""}`);
    return res as NoticeListRes;
  } catch (err) {
    console.error(err);
    throw new Error("게시판 목록 조회에 실패했습니다.");
  }
};

// 게시판 상세 조회
export const getNoticeDetail = async (id: string): Promise<NoticeItem> => {
  try {
    const res = await apiFetch(`/notices/${id}`);
    return res as NoticeItem;
  } catch (err) {
    console.error(err);
    throw new Error("게시판 상세 조회에 실패했습니다.");
  }
};

// 게시판 삭제
export const deleteNotice = async (id: string): Promise<void> => {
  try {
    await apiFetch(`/notices/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error(err);
    throw new Error("게시판 삭제에 실패했습니다.");
  }
};

// 게시판 생성
export const createNotice = async (
  req: NoticeCreateReq | EventCreateReq,
): Promise<NoticeItem> => {
  try {
    const res = await apiFetch(`/notices`, {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res as NoticeItem;
  } catch (err) {
    console.error(err);
    throw new Error("게시판 생성에 실패했습니다.");
  }
};

// 게시판 수정
export const updateNotice = async (
  id: string,
  req: NoticeCreateReq | EventCreateReq,
): Promise<NoticeItem> => {
  try {
    const res = await apiFetch(`/notices/${id}`, {
      method: "PUT",
      body: JSON.stringify(req),
    });
    return res as NoticeItem;
  } catch (err) {
    console.error(err);
    throw new Error("게시판 수정에 실패했습니다.");
  }
};
