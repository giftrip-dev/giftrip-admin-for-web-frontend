import { ExperienceCategory } from "@/app/api/dto/experience";

// label 매핑 객체
export const EXPERIENCE_CATEGORY_LABEL: Record<ExperienceCategory, string> = {
  [ExperienceCategory.ALL]: "전체",
  [ExperienceCategory.TRAVEL]: "여행상품",
  [ExperienceCategory.RESTAURANT]: "맛집",
  [ExperienceCategory.CAFE]: "카페",
  [ExperienceCategory.CULTURE_ART]: "문화예술",
  [ExperienceCategory.ATTRACTION]: "관광지",
};

// 체험 카테고리 셀렉트 박스 데이터
export const EXPERIENCE_CATEGORY_ARRAY = Object.entries(
  EXPERIENCE_CATEGORY_LABEL,
).map(([value, label]) => ({
  label,
  value: value as ExperienceCategory,
}));

// 체험 카테고리 셀렉트 박스 데이터 (생성용)
export const EXPERIENCE_CATEGORY_ARRAY_CREATE = Object.entries(
  EXPERIENCE_CATEGORY_LABEL,
)
  .filter(([value]) => value !== ExperienceCategory.ALL)
  .map(([value, label]) => ({
    label,
    value: value,
  }));

// 체험 판매 상태 라디오 데이터
export const EXPERIENCE_ACTIVE_ARRAY = [
  { value: "true", label: "판매" },
  { value: "false", label: "판매 중단" },
];

// 체험 상품 문의 사항 데이터
export const EXPERIENCE_INQUIRY_INFO_ARRAY = `✅ Q. 해당 체험의 예약 확정은 언제 받을 수 있나요?\n예약 관련 사항은 카카오톡 플러스친구로 문의주시면 상세히 안내드리겠습니다.\n\n✅ Q. 일정 변경이나 취소는 어떻게 처리되나요?\n일정 변경 및 취소 관련 문의는 카카오톡 플러스친구로 접수 부탁드립니다.\n\n✅ Q.✅ Q. 현지 교통편이나 픽업 서비스가 포함되어 있나요?\n본 체험 상품에는 교통편 및 픽업 서비스가 포함되어 있지 않으며, 체험 장소까지는 고객님께서 개별적으로 이동해 주셔야 합니다.\n\n✅ Q.  우천 시에도 체험 진행이 가능한가요?\n우천 시 진행 여부는 재난 정도에 따라 유동적으로 진행될 수 있으며, 천재지변으로 인한 이용불가 시 전액 환불을 도와드리고있습니다.\n\n✅ Q. 예약 전 상담이 필요합니다. 어디로 연락하면 될까요?\n예약 전 상담은 카카오톡 플러스친구를 통해 진행하고 있습니다.`;

// 여행 상품 취소 및 환불 사항 데이터
export const EXPERIENCE_CHANGE_INFO_ARRAY = `예약일 4일 전 오전 11시까지(공휴일 제외) : 100% 환불\n\n예약일 4일 전 오전 11시 이후(공휴일 제외) : 0% 환불\n\n취소 가능 시점 이후의 요청건은 환불 불가합니다.(상품 미숙지로 인한 오구매, 개인 사정 등 모든 사유 포함)\n\n패키지 상품으로 인해, 미사용 및 기상 악화로 인한 부분 환불은 불가합니다`;
