"use client";

import ShortRow from "@/app/_components/table/short-row";
import { BANNER_CATEGORY_PARTIAL } from "@/app/api/dto/banner";
import CustomInputField from "@/components/shared/form/custom-input-field";
import CustomRadioField from "@/components/shared/form/custom-radio-field";
import CustomSelectField from "@/components/shared/form/custom-select-field";
import { Form } from "@/components/ui/form";
import { BANNER_CATEGORY_LABEL } from "@/constants/banner";
import CancelAndCreateButtonBar from "@/app/_components/button/cancel-and-create-button-bar";
import { useRouter } from "next/navigation";
import { COUPON_DETAIL_PAGE, COUPON_PAGE } from "@/constants/path";
import {
  COUPON_ACTIVE_ARRAY_CREATE,
  COUPON_HAS_PERIOD_ARRAY,
  COUPON_SCOPE_ARRAY_CREATE,
} from "@/constants/coupon";
import { usePostCoupon } from "@/hooks/coupon/use-post-coupon";
import { useUpdateCoupon } from "@/hooks/coupon/use-update-coupon";
import { CustomDateRangeField } from "@/components/shared/form/custom-calendar-field";

interface CouponFormProps {
  mode: "create" | "edit";
  couponId?: string;
}

const CouponForm = ({ mode, couponId }: CouponFormProps) => {
  const createCoupon = usePostCoupon();
  const updateCoupon = useUpdateCoupon(couponId);
  const isEdit = mode === "edit";

  const { form, onSubmit, isLoading } = isEdit ? updateCoupon : createCoupon;
  const router = useRouter();

  // 취소 버튼 핸들러
  const clickCancel = () => {
    if (!isEdit) {
      router.push(COUPON_PAGE);
    } else {
      router.push(COUPON_DETAIL_PAGE.replace("[id]", couponId as string));
    }
  };

  const buttonText = isEdit ? "수정" : "생성";

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <ShortRow label="활성화 여부" value={""} size="lg">
          <CustomRadioField
            form={form}
            direction="horizontal"
            name="isActive"
            radioValue={COUPON_ACTIVE_ARRAY_CREATE.map((item) => ({
              value: item.value,
              label: item.label,
            }))}
          />
        </ShortRow>
        {/* 사용 범위 */}
        <ShortRow label="사용 범위" value={""} size="lg">
          <CustomRadioField
            form={form}
            direction="horizontal"
            name="scope"
            radioValue={COUPON_SCOPE_ARRAY_CREATE.map((item) => ({
              value: item.value,
              label: item.label,
            }))}
          />
        </ShortRow>
        <ShortRow label="카테고리" value={""} size="lg">
          <CustomSelectField
            form={form}
            placeholder="선택"
            name="itemType"
            selectValue={Object.values(BANNER_CATEGORY_PARTIAL).map((item) => ({
              value: item,
              label: BANNER_CATEGORY_LABEL[item],
            }))}
          />
        </ShortRow>
        <ShortRow label="쿠폰명" value={""} size="lg">
          <CustomInputField
            form={form}
            name="name"
            placeholder="쿠폰명을 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="쿠폰 설명" value={""} size="lg">
          <CustomInputField
            form={form}
            name="description"
            placeholder="쿠폰 설명을 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="할인율" value={""} size="lg">
          <div className="flex items-center gap-2">
            <CustomInputField
              form={form}
              name="discountRate"
              placeholder="할인율 (1 ~ 100)"
              type="rate"
              noSpace
              maxLength={3}
              className="w-[150px]"
            />
            <span className="text-body-2">%</span>
          </div>
        </ShortRow>
        <ShortRow label="유효 기간" isLastRow value={""} size="lg">
          <div className="flex flex-col gap-2 py-5">
            <CustomRadioField
              form={form}
              direction="horizontal"
              name="hasPeriod"
              radioValue={COUPON_HAS_PERIOD_ARRAY.map((item) => ({
                value: item.value,
                label: item.label,
              }))}
            />
            {form.watch("hasPeriod") === "true" && (
              <CustomDateRangeField
                form={form}
                disablePastDates={!isEdit}
                startField="startDate"
                endField="endDate"
                className="w-full"
              />
            )}
          </div>
        </ShortRow>
        <div className="fixed right-0 top-0 mr-10 mt-10">
          <CancelAndCreateButtonBar
            cancelButtonText="취소"
            createButtonText={buttonText}
            onClickCancel={clickCancel}
            onClickCreate={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default CouponForm;
