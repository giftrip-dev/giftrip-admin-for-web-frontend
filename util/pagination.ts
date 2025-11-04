import { ReadonlyURLSearchParams } from "next/navigation";

/**
 * URLSearchParams에서 prev 값을 읽어 정수로 반환 (기본값: 1)
 */
export const getPageFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  defaultPage = 1,
): number => {
  const page = Number(searchParams.get("prev"));
  return Number.isInteger(page) && page > 0 ? page : defaultPage;
};

/**
 * 기존 searchParams 기반으로 prev 값을 변경한 URL 문자열 반환
 */
export const getUpdatedSearchWithPage = (
  searchParams: ReadonlyURLSearchParams,
  newPage: number,
): string => {
  const newParams = new URLSearchParams(searchParams);
  newParams.set("prev", String(newPage));
  return newParams.toString();
};
