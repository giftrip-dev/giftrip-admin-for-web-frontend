import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import { accommodationProductSchema } from "@/schema/accommodation";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { NoDataCell } from "@/app/_components/table/no-data-cell";
import { ProductType } from "@/constants/product";
import { AppliedCoupon, CouponScope } from "@/app/api/dto/coupon";
import ApplyCouponButton from "@/app/_components/button/appy-coupon-button";

interface AppliedCouponFormProps {
  form: UseFormReturn<z.infer<typeof accommodationProductSchema>>;
  originalPrice: number;
  updateFinalPrice: (originalPrice: number, discountRate?: number) => void;
  itemType: ProductType;
  coupon?: AppliedCoupon | null;
  setCoupon?: (coupon: AppliedCoupon | null) => void;
  showRemoveButton?: boolean;
}

const AppliedCouponForm = ({
  form,
  originalPrice,
  updateFinalPrice,
  itemType,
  coupon: externalCoupon,
  setCoupon: externalSetCoupon,
  showRemoveButton = false,
}: AppliedCouponFormProps) => {
  const [internalCoupon, setInternalCoupon] = useState<AppliedCoupon | null>(
    null,
  );

  // 외부에서 coupon을 관리하는지 내부에서 관리하는지 결정
  const coupon = externalCoupon !== undefined ? externalCoupon : internalCoupon;
  const setCoupon = externalSetCoupon || setInternalCoupon;

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
        <div className="flex items-center gap-2">
          {showRemoveButton && coupon && (
            <button
              type="button"
              onClick={() => setCoupon(null)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              제거
            </button>
          )}
          <ApplyCouponButton
            itemType={itemType}
            originalPrice={originalPrice}
            setCoupon={setCoupon}
            scope={CouponScope.PRODUCT_REGISTRATION}
          />
        </div>
      </div>
      {/* 테이블 (혜택명, 할인률, 기간) */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>혜택명</TableHead>
            <TableHead>할인율</TableHead>
            <TableHead>기간</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupon ? (
            <TableRow>
              <TableCell size="lg">{coupon.name}</TableCell>
              <TableCell size="lg">{coupon.discountRate}</TableCell>
              <TableCell size="lg">
                {coupon.startDate} ~ {coupon.endDate}
              </TableCell>
            </TableRow>
          ) : (
            <NoDataCell colSpan={3} size="md" text="적용된 혜택이 없어요" />
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedCouponForm;
