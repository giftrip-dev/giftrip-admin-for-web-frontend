import { useEffect, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ProductType } from "@/constants/product";
import AppliedCouponTable from "@/app/_components/table/applied-coupon-table";
import { AppliedCoupon, CouponScope } from "@/app/api/dto/coupon";
import { shoppingProductSchema } from "@/schema/shopping";
import ApplyCouponButton from "@/app/_components/button/appy-coupon-button";

interface AppliedCouponFormProps {
  form: UseFormReturn<z.infer<typeof shoppingProductSchema>>;
  originalPrice: number;
  updateFinalPrice: (originalPrice: number, discountRate?: number) => void;
  itemType: ProductType;
  coupon: AppliedCoupon | null;
  setCoupon: (coupon: AppliedCoupon | null) => void;
  showRemoveButton?: boolean;
}

const AppliedCouponForm = ({
  form,
  originalPrice,
  updateFinalPrice,
  itemType,
  coupon,
  setCoupon,
  showRemoveButton = false,
}: AppliedCouponFormProps) => {
  // 쿠폰 제거 핸들러
  const handleRemoveCoupon = useCallback(() => {
    form.setValue("appliedCoupon", null);
    setCoupon(null);
  }, [setCoupon, form]);

  // 쿠폰 적용 시 최종 가격과 적용 쿠폰 id 업데이트
  useEffect(() => {
    if (coupon) {
      updateFinalPrice(originalPrice, coupon.discountRate);
      form.setValue("appliedCouponId", coupon.id);
    } else {
      updateFinalPrice(originalPrice);
      form.setValue("appliedCouponId", null);
    }
  }, [coupon, form, originalPrice, updateFinalPrice]);

  return (
    <div className="flex w-full flex-col gap-3 py-3">
      <div className="flex items-center justify-between">
        <p className="text-title-2">적용된 혜택</p>
        <ApplyCouponButton
          itemType={itemType}
          originalPrice={originalPrice}
          setCoupon={setCoupon}
          scope={CouponScope.PRODUCT_REGISTRATION}
        />
      </div>
      <AppliedCouponTable
        coupon={coupon}
        showRemoveButton={showRemoveButton}
        onRemove={handleRemoveCoupon}
      />
    </div>
  );
};

export default AppliedCouponForm;
