import ShortRow from "@/app/_components/table/short-row";
import { ReviewItem } from "@/app/api/dto/review";
import { PRODUCT_TYPES } from "@/constants/product";

interface ProductInfoBoxProps {
  review: ReviewItem;
}

const ProductInfoBox = ({ review }: ProductInfoBoxProps) => {
  const isProduct = review.itemType === PRODUCT_TYPES.PRODUCT;
  return (
    <div className="flex flex-col gap-6">
      <p className="text-title-1">
        {isProduct ? "주문 상품 정보" : "예약 상품 정보"}
      </p>
      <ShortRow size="md" label="상품명" value={review.itemName} />
    </div>
  );
};

export default ProductInfoBox;
