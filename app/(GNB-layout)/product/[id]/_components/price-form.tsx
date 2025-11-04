import { UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";
import ShortRow from "@/app/_components/table/short-row";
import CustomInputField from "@/components/shared/form/custom-input-field";
import AppliedCouponForm from "./applied-coupon-form";
import { PRODUCT_TYPES } from "@/constants/product";
import { AppliedCoupon } from "@/app/api/dto/coupon";
import { useEffect, useCallback } from "react";
import { shoppingProductSchema } from "@/schema/shopping";

interface PriceFormProps {
  form: UseFormReturn<z.infer<typeof shoppingProductSchema>>;
  coupon?: AppliedCoupon | null;
  setCoupon?: (coupon: AppliedCoupon | null) => void;
  isEdit?: boolean;
}

const PriceForm = ({
  form,
  coupon,
  setCoupon,
  isEdit = false,
}: PriceFormProps) => {
  // 원가 변경 감지
  const originalPrice = useWatch({
    control: form.control,
    name: "originalPrice",
  });

  // 최종 가격 업데이트 핸들러 메모이제이션
  const updateFinalPrice = useCallback(
    (originalPriceNumber: number, discountRate?: number) => {
      if (originalPriceNumber < 0) {
        return;
      }

      const finalPrice = discountRate
        ? Math.round(originalPriceNumber * (1 - discountRate / 100))
        : originalPriceNumber;

      form.setValue("finalPrice", finalPrice);
    },
    [form],
  );

  // 안정적인 setCoupon 함수 생성
  const stableCouponSetter = useCallback(
    (coupon: AppliedCoupon | null) => {
      setCoupon?.(coupon);
    },
    [setCoupon],
  );

  // 원가나 쿠폰이 변경될 때 최종가격 업데이트
  useEffect(() => {
    const originalPriceNumber = Number(originalPrice);
    if (originalPriceNumber >= 0) {
      updateFinalPrice(originalPriceNumber, coupon?.discountRate);
    }
  }, [originalPrice, coupon?.discountRate, updateFinalPrice]);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">가격 설정</p>
      <div>
        <ShortRow label="가격" value={""} size="md">
          <CustomInputField
            type="price"
            form={form}
            name="originalPrice"
            placeholder="가격을 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="할인 혜택" value={""} size="md">
          <AppliedCouponForm
            form={form}
            itemType={PRODUCT_TYPES.PRODUCT}
            originalPrice={originalPrice || 0}
            updateFinalPrice={updateFinalPrice}
            coupon={coupon || null}
            setCoupon={stableCouponSetter}
            showRemoveButton={isEdit}
          />
        </ShortRow>
        <ShortRow isLastRow label="할인가" value={""} size="md">
          <CustomInputField
            form={form}
            type="price"
            name="finalPrice"
            disabled
            placeholder="쿠폰 적용 후 자동 계산"
          />
        </ShortRow>
      </div>
    </div>
  );
};

export default PriceForm;
