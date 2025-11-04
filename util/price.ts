// 3자리 단위로 콤마 붙이는 함수
export const handleCommaPrice = (
  price: number | string | undefined,
  hasText?: string,
) => {
  if (price === undefined) return "-";
  if (hasText) {
    return `${Number(price).toLocaleString()}${hasText}`;
  } else return Number(price).toLocaleString();
};

// 3자리 단위로 콤마를 붙이고 단위를 붙이는 함수
export const commaWithUnit = (
  price: number | string,
  unit?: string,
): string => {
  // 빈 값 처리
  if (price === "" || price === undefined || price === null) {
    return "";
  }

  // 문자열일 경우 콤마 제거 후 숫자 변환
  const numericPrice =
    typeof price === "number"
      ? price
      : parseFloat(price.toString().replace(/,/g, ""));

  // 숫자 변환 실패 시 원본 문자열 반환
  if (isNaN(numericPrice)) {
    return price.toString();
  }

  const formattedNumber = numericPrice.toLocaleString("ko-KR");

  return unit ? `${formattedNumber}${unit}` : formattedNumber;
};
