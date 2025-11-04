import ShortRow from "@/app/_components/table/short-row";
import { OrderDetailOrderItem } from "@/app/api/dto/order";
import { SHOPPING_CATEGORY_LABEL } from "@/constants/shopping";

interface ProductInfoBoxProps {
  data: OrderDetailOrderItem;
}

const ProductInfoBox = ({ data }: ProductInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">주문 상품 정보</p>
      <div>
        <ShortRow size="sm" label="상품명" value={data.itemTitle} />
        <ShortRow size="sm" label="수량" value={data.quantity} />
        <ShortRow
          size="sm"
          label="카테고리"
          value={SHOPPING_CATEGORY_LABEL[data.category]}
        />
        <ShortRow
          size="sm"
          label="담당자 연락처"
          value={data.managerPhoneNumber ?? "-"}
        />
        <ShortRow size="sm" label="제조사" value={data.manufacturer ?? "-"} />
        <ShortRow size="sm" label="관련링크" value={data.relatedLink ?? "-"} />
        <ShortRow
          isLastRow
          size="sm"
          label="상세정보"
          value={data.description ?? "-"}
        />
      </div>
    </div>
  );
};

export default ProductInfoBox;
