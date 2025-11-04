"use client";

import { Form } from "@/components/ui/form";
import CancelAndCreateButtonBar from "@/app/_components/button/cancel-and-create-button-bar";
import { useRouter } from "next/navigation";
import {
  SHOPPING_PRODUCT_DETAIL_PAGE,
  SHOPPING_PRODUCT_PAGE,
} from "@/constants/path";
import { usePostShoppingProduct } from "@/hooks/shopping/use-post-shopping-product";
import DisplayForm from "../../_components/display-form";
import BasicForm from "../../_components/basic-form";
import InquiryForm from "../../_components/inquiry-form";
import { useUpdateShoppingProduct } from "@/hooks/shopping/use-update-shopping-product";
import PriceForm from "./price-form";
import OptionAndStockForm from "./option-and-stock-form";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import ChangeInfoForm from "./change-info-form";

interface ShoppingFormProps {
  mode: "create" | "edit";
  shoppingProductId?: string;
  prev: string;
}

const ShoppingForm = ({ mode, shoppingProductId, prev }: ShoppingFormProps) => {
  const createProduct = usePostShoppingProduct();
  const updateProduct = useUpdateShoppingProduct(shoppingProductId);
  const [isEditMode, setIsEditMode] = useState(false); // 옵션 수정 모드 활성화 여부
  const isEdit = mode === "edit";

  const { form, onSubmit, isLoading, coupon, setCoupon } = isEdit
    ? updateProduct
    : createProduct;
  const router = useRouter();

  // 취소 버튼 핸들러
  const clickCancel = () => {
    if (!isEdit) {
      router.push(SHOPPING_PRODUCT_PAGE + `?prev=${prev}`);
    } else {
      router.push(
        `${SHOPPING_PRODUCT_DETAIL_PAGE.replace("[id]", shoppingProductId as string)}?prev=${prev}`,
      );
    }
  };

  const buttonText = isEdit ? "수정" : "생성";

  // 저장 버튼 핸들러
  const submitForm = () => {
    if (isEditMode) {
      toast({
        title: "옵션 수정 중",
        description: "옵션을 저장하고 상품 등록을 진행해주세요",
      });
    } else {
      onSubmit();
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <DisplayForm form={form} />
        <BasicForm form={form} />
        <PriceForm form={form} coupon={coupon} setCoupon={setCoupon} />
        <OptionAndStockForm
          form={form}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
        <InquiryForm form={form} />
        <ChangeInfoForm form={form} />
        <div className="fixed right-0 top-0 mr-10 mt-10">
          <CancelAndCreateButtonBar
            cancelButtonText="취소"
            createButtonText={buttonText}
            onClickCancel={clickCancel}
            onClickCreate={submitForm}
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default ShoppingForm;
