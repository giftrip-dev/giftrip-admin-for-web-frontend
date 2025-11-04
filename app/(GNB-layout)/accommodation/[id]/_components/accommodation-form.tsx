"use client";

import { Form } from "@/components/ui/form";
import CancelAndCreateButtonBar from "@/app/_components/button/cancel-and-create-button-bar";
import { useRouter } from "next/navigation";
import {
  ACCOMMODATION_PRODUCT_PAGE,
  ACCOMMODATION_PRODUCT_DETAIL_PAGE,
} from "@/constants/path";
import DisplayForm from "../../_components/display-form";
import BasicForm from "../../_components/basic-form";
import { usePostAccommodationProduct } from "@/hooks/accommodation/use-post-accommodation-product";
import CompanyInfoBox from "./company-info-box";
import StockForm from "./stock-form";
import PriceForm from "../../_components/price-form";
import { useUpdateAccommodationProduct } from "@/hooks/accommodation/use-update-accommodation-product";
import { useState, useEffect } from "react";
import { AccommodationCompanyItem } from "@/app/api/dto/accommodation";
import { AppliedCoupon } from "@/app/api/dto/coupon";

interface AccommodationFormProps {
  mode: "create" | "edit";
  accommodationId?: string;
  prev: string;
}

const AccommodationForm = ({
  mode,
  accommodationId,
  prev,
}: AccommodationFormProps) => {
  const createAccommodation = usePostAccommodationProduct();
  const updateAccommodation = useUpdateAccommodationProduct(accommodationId);
  const isEdit = mode === "edit";
  const [selectedCompany, setSelectedCompany] =
    useState<AccommodationCompanyItem | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null,
  );

  const { form, onSubmit, isLoading, accommodationDetail, companyDetail } =
    isEdit
      ? updateAccommodation
      : {
          ...createAccommodation,
          accommodationDetail: null,
          companyDetail: null,
        };
  const router = useRouter();

  // accommodationDetail에서 쿠폰 정보 설정
  useEffect(() => {
    if (accommodationDetail && isEdit) {
      form.setValue("accommodationId", accommodationDetail.id);

      // 적용된 쿠폰 정보 설정
      if (accommodationDetail.appliedCoupon) {
        setAppliedCoupon(accommodationDetail.appliedCoupon);
      }
    }
  }, [accommodationDetail, isEdit, form]);

  // companyDetail에서 업체 정보 설정
  useEffect(() => {
    if (companyDetail && isEdit) {
      const companyInfo: AccommodationCompanyItem = {
        id: companyDetail.id,
        name: companyDetail.name,
        category: companyDetail.category,
        mainLocation: companyDetail.mainLocation,
        subLocation: companyDetail.subLocation,
        managerName: companyDetail.managerName,
        managerPhoneNumber: companyDetail.managerPhoneNumber || "",
        address1: companyDetail.address1 || "",
        thumbnailUrl: companyDetail.thumbnailUrl || "",
        cheapestOriginalPrice: companyDetail.cheapestOriginalPrice,
        cheapestFinalPrice: companyDetail.cheapestFinalPrice,
        cheapestDiscountRate: companyDetail.cheapestDiscountRate,
        createdAt: companyDetail.createdAt,
        updatedAt: companyDetail.updatedAt,
      };
      setSelectedCompany(companyInfo);
    }
  }, [companyDetail, isEdit]);

  // 취소 버튼 핸들러
  const clickCancel = () => {
    if (!isEdit) {
      router.push(ACCOMMODATION_PRODUCT_PAGE + `?prev=${prev}`);
    } else {
      router.push(
        `${ACCOMMODATION_PRODUCT_DETAIL_PAGE.replace("[id]", accommodationId as string)}?prev=${prev}`,
      );
    }
  };

  const buttonText = isEdit ? "수정" : "생성";

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <DisplayForm form={form} />
        <CompanyInfoBox form={form} initialCompany={selectedCompany} />
        <BasicForm form={form} />
        <PriceForm
          form={form}
          coupon={appliedCoupon}
          setCoupon={setAppliedCoupon}
          isEdit={isEdit}
        />
        <StockForm form={form} />
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

export default AccommodationForm;
