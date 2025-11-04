// 날짜 변환 함수
const formattedDate = (
  utcValue: number | null | string | undefined | Date,
  format: string = "YYYY-MM-DD", // 기본 포맷
) => {
  if (!utcValue) return "-";

  const date = new Date(utcValue);
  const year = date.getFullYear();
  const shortenedYear = year.toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // 포맷 문자열을 실제 날짜로 변환
  let result = format;

  // 연도 변환
  result = result.replace("YYYY", year.toString());
  result = result.replace("YY", shortenedYear);

  // 월, 일 변환
  result = result.replace("MM", month);
  result = result.replace("DD", day);

  // 시간 변환
  result = result.replace("HH", hours);
  result = result.replace("mm", minutes);
  result = result.replace("ss", seconds);

  // 구분자 변환
  if (format === "YY-MM-DD") {
    return `${shortenedYear}.${month}.${day}`;
  }

  return result;
};

export default formattedDate;
