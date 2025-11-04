import {
  AccommodationCategory,
  AccommodationMainLocation,
  AccommodationSubLocation,
} from "@/app/api/dto/accommodation";

// 숙소 카테고리 라벨 매핑 객체
export const ACCOMMODATION_CATEGORY_LABEL: Record<
  AccommodationCategory,
  string
> = {
  [AccommodationCategory.ALL]: "전체",
  [AccommodationCategory.HOTEL]: "호텔",
  [AccommodationCategory.PENSION]: "펜션",
  [AccommodationCategory.PRIVATE_HOUSE]: "주택",
  [AccommodationCategory.MOTEL]: "모텔",
  [AccommodationCategory.RESORT]: "리조트",
  [AccommodationCategory.INN]: "민박",
  [AccommodationCategory.CAMPING]: "캠핑",
  [AccommodationCategory.GUEST_HOUSE]: "게스트하우스",
};

// 숙소 카테고리 셀렉트 박스 데이터
export const ACCOMMODATION_CATEGORY_ARRAY = Object.entries(
  ACCOMMODATION_CATEGORY_LABEL,
).map(([value, label]) => ({
  label,
  value: value,
}));

// 숙소 대분류 라벨 매핑 객체
export const ACCOMMODATION_MAIN_LOCATION_LABEL: Record<
  AccommodationMainLocation,
  string
> = {
  [AccommodationMainLocation.ALL]: "전체",
  [AccommodationMainLocation.CAPITAL]: "수도권",
  [AccommodationMainLocation.GANGWON]: "강원도",
  [AccommodationMainLocation.GYEONGSANG]: "경상도",
  [AccommodationMainLocation.CHUNGCHEONG]: "충청도",
  [AccommodationMainLocation.JEOLLA]: "전라도",
  [AccommodationMainLocation.JEJU]: "제주도",
};

// 숙소 대분류 셀렉트 박스 데이터
export const ACCOMMODATION_MAIN_LOCATION_ARRAY = Object.entries(
  ACCOMMODATION_MAIN_LOCATION_LABEL,
).map(([value, label]) => ({
  label,
  value: value as AccommodationMainLocation,
}));

// 숙소 소분류 라벨 매핑 객체
export const ACCOMMODATION_SUB_LOCATION_LABEL: Record<
  AccommodationSubLocation,
  string
> = {
  [AccommodationSubLocation.ALL]: "전체",
  [AccommodationSubLocation.SEOUL]: "서울",
  [AccommodationSubLocation.INCHUN]: "인천",
  [AccommodationSubLocation.GAPYEONG]: "가평/남양주/포천",
  [AccommodationSubLocation.YONGIN]: "용인/수원/화성/평택",
  [AccommodationSubLocation.PACHUN]: "파주/고양/김포",
  [AccommodationSubLocation.ICHUN]: "이천/여주/안성/광주",
  [AccommodationSubLocation.GANGRI]: "강릉/속초/양양",
  [AccommodationSubLocation.CHUNCHUN]: "춘천/인제/철원",
  [AccommodationSubLocation.PANGCHUN]: "평창/정선/영월",
  [AccommodationSubLocation.DONGHAE]: "동해/삼척/태백",
  [AccommodationSubLocation.HONGCHUN]: "홍천/횡성/원주",
  [AccommodationSubLocation.BUSAN]: "부산",
  [AccommodationSubLocation.GEOJU]: "경주/포항",
  [AccommodationSubLocation.DAEGU]: "대구",
  [AccommodationSubLocation.ULSA]: "울산/양산/밀양",
  [AccommodationSubLocation.GEJE]: "거제/통영/남해",
  [AccommodationSubLocation.DAEJEON]: "대전/세종",
  [AccommodationSubLocation.CHUNGCHEONG]: "충주/제천/단양",
  [AccommodationSubLocation.TAEAN]: "태안/서산/보령",
  [AccommodationSubLocation.BUSEO]: "부여/공주",
  [AccommodationSubLocation.JEONJU]: "전주/군산",
  [AccommodationSubLocation.GANGWON]: "광주/나주/담양",
  [AccommodationSubLocation.MOSAN]: "여수/순천/보성",
  [AccommodationSubLocation.MOKPO]: "목포/해남/진도",
  [AccommodationSubLocation.JEJU]: "제주시",
  [AccommodationSubLocation.SEOGUIPO]: "서귀포시",
};

// 숙소 소분류 셀렉트 박스 데이터
export const ACCOMMODATION_SUB_LOCATION_ARRAY = Object.entries(
  ACCOMMODATION_SUB_LOCATION_LABEL,
).map(([, label]) => ({
  label,
  value: label,
}));

// 숙소 상품 문의 정보
export const ACCOMMODATION_INQUIRY_INFO = `✅ Q. 예약 취소나 변경은 어떻게 해야 하나요?\n예약 취소 및 변경은 이용일 7일 전까지 가능하며 6일 전부터 별도의 수수료가 부과되어 전액 환불이 불가능합니다.\n\n✅ Q. 숙소에 주차가 가능한가요?\n주차 가능 여부는 숙소에 따라 다르며, 카카오톡 플러스친구로 문의주시면 상세히 확인해드리겠습니다.\n\n✅ Q. 숙소 예약 시 식사가 포함되어 있나요?\n숙소별로 제공되는 서비스가 다르므로, 식사 포함 여부는 카카오톡 플러스친구를 통해 확인 부탁드립니다.\n\n✅ Q. 숙소 예약 후 추가 요청(예: 침구 추가, 룸 업그레이드)이 가능한가요?\n추가 요청 사항은 카카오톡 플러스친구로 문의주시면 가능 여부를 확인해드리겠습니다.`;
