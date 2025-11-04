import { CampaignCategory } from "@/app/api/dto/campaign";

// 라벨 매핑 객체
export const CAMPAIGN_CATEGORY_LABEL: Record<CampaignCategory, string> = {
  [CampaignCategory.ALL]: "전체",
  [CampaignCategory.INFLUENCER]: "인플루언서",
  [CampaignCategory.GENERAL]: "일반",
  [CampaignCategory.GROUP_BUY]: "공동구매",
};

// 체험 대상 유형 셀렉트 박스 데이터
export const CAMPAIGN_CATEGORY_ARRAY = Object.entries(
  CAMPAIGN_CATEGORY_LABEL,
).map(([value, label]) => ({
  label,
  value: value as CampaignCategory,
}));

// 체험단 상품 문의 사항 데이터
export const CAMPAIGN_INQUIRY_INFO_ARRAY = `✅ Q. 해당 체험단의 예약 확정은 언제 받을 수 있나요?\n예약 관련 사항은 카카오톡 플러스친구로 문의주시면 상세히 안내드리겠습니다.\n\n✅ Q. 일정 변경이나 취소는 어떻게 처리되나요?\n일정 변경 및 취소 관련 문의는 카카오톡 플러스친구로 접수 부탁드립니다.\n\n✅ Q.✅ Q. 현지 교통편이나 픽업 서비스가 포함되어 있나요?\n본 체험 상품에는 교통편 및 픽업 서비스가 포함되어 있지 않으며, 체험 장소까지는 고객님께서 개별적으로 이동해 주셔야 합니다.\n\n✅ Q.  우천 시에도 체험 진행이 가능한가요?\n우천 시 진행 여부는 재난 정도에 따라 유동적으로 진행될 수 있으며, 천재지변으로 인한 이용불가 시 전액 환불을 도와드리고있습니다.\n\n✅ Q. 예약 전 상담이 필요합니다. 어디로 연락하면 될까요?\n예약 전 상담은 카카오톡 플러스친구를 통해 진행하고 있습니다.`;
