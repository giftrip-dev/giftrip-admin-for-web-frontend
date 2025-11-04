import { ShoppingCategory } from "@/app/api/dto/shopping";

// 라벨 매핑 객체
export const SHOPPING_CATEGORY_LABEL: Record<ShoppingCategory, string> = {
  [ShoppingCategory.ALL]: "전체",
  [ShoppingCategory.SPECIALITY]: "특산물",
  [ShoppingCategory.LOCAL]: "지역특산품",
  [ShoppingCategory.SOUVENIR]: "기념품",
  [ShoppingCategory.FOOD]: "음식",
  [ShoppingCategory.HEALTH_FOOD]: "건강식품",
  [ShoppingCategory.LIVING_STATIONERY]: "생활용품",
  [ShoppingCategory.KITCHEN]: "주방용품",
  [ShoppingCategory.FURNITURE_ELECTRONICS]: "가구/전자제품",
  [ShoppingCategory.MEDICAL_BEAUTY]: "의료/뷰티",
  [ShoppingCategory.OTHERS]: "기타",
};

// 쇼핑 상품 카테고리 셀렉트 박스 데이터
export const SHOPPING_CATEGORY_ARRAY = Object.entries(
  SHOPPING_CATEGORY_LABEL,
).map(([value, label]) => ({
  label,
  value: value as ShoppingCategory,
}));

// 쇼핑 상품 문의 사항
export const SHOPPING_INQUIRY_INFO = `✅ Q. 배송은 언제 출발하나요?\n평균적으로 배송 확인 후 1~2일 내 상품이 출고됩니다. 하지만 재고 상황에 따라 출고가 지연될 시 개별 연락을 통해 안내해드립니다.\n\n✅ Q. 주문 후 배송지 변경이 가능한가요?\n배송지 변경은 상품 준비 중일 시에만 가능하며 출고 후 배송지 변경은 불가능합니다.\n\n✅ Q. 상품 불량/하자 발생 시 어떻게 처리되나요?\n상품 수령 후 불량이나 하자가 확인될 경우 카카오톡 플러스친구로 접수해 주시면 교환 또는 환불 절차를 안내해드리겠습니다.\n\n✅ 주문 후 옵션(색상, 사이즈 등) 변경이 가능한가요?\n주문 완료 후 옵션 변경은 불가능하오니, 부득이한 경우 카카오톡 플러스친구로 문의해 주시기 바랍니다.`;
