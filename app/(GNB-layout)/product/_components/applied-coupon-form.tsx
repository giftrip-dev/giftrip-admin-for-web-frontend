import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import { experienceProductSchema } from "@/schema/experience";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import ApplyCouponButton from "./apply-coupon-button";
import { useEffect, useState } from "react";
import { NoDataCell } from "@/app/_components/table/no-data-cell";
import { ProductType } from "@/constants/product";
import { AppliedCoupon } from "@/app/api/dto/coupon";

interface AppliedCouponFormProps {
  form: UseFormReturn<z.infer<typeof experienceProductSchema>>;
  originalPrice: number;
  updateFinalPrice: (originalPrice: number, discountRate?: number) => void;
  itemType: ProductType;
}

const AppliedCouponForm = ({
  form,
  originalPrice,
  updateFinalPrice,
  itemType,
}: AppliedCouponFormProps) => {
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);

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
        />
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
