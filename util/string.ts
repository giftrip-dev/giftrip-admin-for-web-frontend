// 닉네임 마스킹 처리 함수
export const handleMaskName = (name: string, isName?: boolean): string => {
  // 이름일 경우
  if (isName) {
    if (name.length === 1) return name;
    if (name.length === 2) {
      return name.slice(0, 1) + "*";
    } else {
      return name.slice(0, 1) + "*".repeat(name.length - 2) + name.slice(-1);
    }
  }

  if (name.length === 1) {
    return name;
  }
  if (name.length < 4) {
    return name.slice(0, 1) + "*".repeat(name.length - 1);
  } else {
    return name.slice(0, 3) + "*".repeat(name.length - 3);
  }
};

// 이메일 마스킹 처리 함수
export const handleMaskEmail = (email: string): string => {
  const id = email.split("@")[0];
  const domain = email.split("@")[1];
  let maskedId; // 마스킹 처리 된 id

  if (id.length < 4) {
    maskedId = id.slice(0, 1) + "*".repeat(id.length - 1);
  } else {
    maskedId = id.slice(0, 2) + "*".repeat(id.length - 2);
  }
  return `${maskedId}@${domain}`;
};

// 전화번호 마스킹 처리 함수
export const handleMaskPhone = (phone: string): string => {
  const maskedPhone =
    phone.slice(0, 3) + "-" + "*".repeat(4) + "-" + phone.slice(7);
  return maskedPhone;
};

// 플랫폼 한글 변환 함수
export const convertPlatformToKorean = (platform: string): string => {
  const platformMap: { [key: string]: string } = {
    youtube: "유튜브",
    instagram: "인스타그램",
    twitter: "트위터",
    naver: "네이버 블로그",
    others: "기타",
  };

  return platformMap[platform.toLowerCase()] || platform;
};
