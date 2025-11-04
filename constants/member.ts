import { MemberType } from "@/app/api/dto/member";

// 회원 유형 체크 박스 데이터
export const MEMBER_TYPE_ARRAY = [
  { label: "전체", value: MemberType.ALL },
  { label: "인플루언서", value: MemberType.INFLUENCER },
  { label: "일반", value: MemberType.GENERAL },
];
