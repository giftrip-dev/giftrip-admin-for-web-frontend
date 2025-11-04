"use client";

import { ImageInputField } from "@/components/shared/form/image-input-field";
import ShortRow from "@/app/_components/table/short-row";
import { BANNER_CATEGORY_PARTIAL } from "@/app/api/dto/banner";
import CustomInputField from "@/components/shared/form/custom-input-field";
import CustomRadioField from "@/components/shared/form/custom-radio-field";
import CustomSelectField from "@/components/shared/form/custom-select-field";
import { Form } from "@/components/ui/form";
import {
  BANNER_ACTIVE_ARRAY_CREATE,
  BANNER_CATEGORY_LABEL,
} from "@/constants/banner";
import { usePostBanner } from "@/hooks/banner/use-post-banner";
import { usePutMainBanner } from "@/hooks/banner/use-put-main-banner";
import CancelAndCreateButtonBar from "@/app/_components/button/cancel-and-create-button-bar";
import { useRouter } from "next/navigation";
import { MAIN_BANNER_DETAIL_PAGE, MAIN_BANNER_PAGE } from "@/constants/path";

interface MainBannerFormProps {
  mode: "create" | "edit";
  bannerId?: string;
}

const MainBannerForm = ({ mode, bannerId }: MainBannerFormProps) => {
  const createBanner = usePostBanner();
  const updateBanner = usePutMainBanner(bannerId);

  const { form, onSubmit, isLoading } =
    mode === "create" ? createBanner : updateBanner;
  const router = useRouter();

  // 취소 버튼 핸들러
  const clickCancel = () => {
    if (mode === "create") {
      router.push(MAIN_BANNER_PAGE);
    } else {
      router.push(MAIN_BANNER_DETAIL_PAGE.replace("[id]", bannerId as string));
    }
  };

  const buttonText = mode === "create" ? "생성" : "수정";

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <ShortRow label="배너명" value={""} size="lg">
          <CustomInputField
            form={form}
            name="title"
            placeholder="배너명을 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="카테고리" value={""} size="lg">
          <CustomRadioField
            form={form}
            direction="horizontal"
            name="itemType"
            radioValue={Object.values(BANNER_CATEGORY_PARTIAL).map((item) => ({
              value: item,
              label: BANNER_CATEGORY_LABEL[item],
            }))}
          />
        </ShortRow>
        <ShortRow label="출력 순서" value={""} size="lg">
          <CustomSelectField
            form={form}
            name="displayOrder"
            placeholder="선택"
            selectValue={Array.from({ length: 31 }, (_, i) => ({
              value: String(i),
              label: String(i),
            }))}
            className="max-w-[150px]"
          />
        </ShortRow>
        <ShortRow label="공개 여부" value={""} size="lg">
          <CustomRadioField
            form={form}
            direction="horizontal"
            name="isActive"
            radioValue={BANNER_ACTIVE_ARRAY_CREATE.map((item) => ({
              value: item.value,
              label: item.label,
            }))}
          />
        </ShortRow>
        <ShortRow label="배너 이미지" value={""} size="lg" isLastRow>
          <ImageInputField
            form={form}
            name="imageUrl"
            description="이미지를 업로드해주세요 ( 1:1 정방향 이미지 )"
            imageSpec="최대 5MB의 JPG,JPEG,PNG,WEBP 이미지 파일"
          />
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

export default MainBannerForm;
