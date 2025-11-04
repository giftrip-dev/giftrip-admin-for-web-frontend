import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProductCouponModal from "../../coupon/_components/modal/product-coupon-modal";
import { AppliedCoupon, CouponScope } from "@/app/api/dto/coupon";
import { toast } from "@/hooks/use-toast";
import { ProductType } from "@/constants/product";

const ApplyCouponButton = ({
  setCoupon,
  originalPrice,
  itemType,
}: {
  setCoupon: (coupon: AppliedCoupon) => void;
  originalPrice: number;
  itemType: ProductType;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 혜택 관리 모달 핸들러
  const clickOpenModal = () => {
    if (originalPrice < 1) {
      toast({ title: "가격 설정 후 쿠폰 적용이 가능해요" });
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size={"sm"}
        onClick={clickOpenModal}
      >
        혜택 관리
      </Button>
      <ProductCouponModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        scope={CouponScope.PRODUCT_REGISTRATION}
        setCoupon={setCoupon}
        itemType={itemType}
      />
    </>
  );
};

export default ApplyCouponButton;
