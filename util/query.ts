type Primitive = string | number | boolean | null | undefined;

// 쿼리 스트링 생성 함수
// keyof T에 대해 각각 Primitive여야 함
export const toQueryString = <T extends { [K in keyof T]: Primitive }>(
  obj: T,
): string => {
  const params = new URLSearchParams();

  (Object.entries(obj) as [keyof T, Primitive][]).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      params.append(String(key), String(val));
    }
  });

  return params.toString();
};
