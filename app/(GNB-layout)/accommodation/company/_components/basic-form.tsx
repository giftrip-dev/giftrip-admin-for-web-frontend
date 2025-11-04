import ShortRow from "@/app/_components/table/short-row";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { accommodationCompanySchema } from "@/schema/accommodation";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { ImageInputField } from "@/components/shared/form/image-input-field";
import CustomTagField from "@/components/shared/form/custom-tag-field";
import CustomSelectField from "@/components/shared/form/custom-select-field";
import {
  ACCOMMODATION_CATEGORY_ARRAY,
  ACCOMMODATION_MAIN_LOCATION_ARRAY,
  ACCOMMODATION_SUB_LOCATION_ARRAY,
} from "@/constants/accommodation";
import {
  AccommodationCategory,
  AccommodationMainLocation,
} from "@/app/api/dto/accommodation";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(
  () => import("@/app/_components/editor/quill-editor"),
  {
    ssr: false,
  },
);

interface BasicFormProps {
  form: UseFormReturn<z.infer<typeof accommodationCompanySchema>>;
}

const BasicForm = ({ form }: BasicFormProps) => {
  const CATEGORY_ARRAY = ACCOMMODATION_CATEGORY_ARRAY.filter(
    (item) => item.value !== AccommodationCategory.ALL,
  );
  const MAIN_LOCATION_ARRAY = ACCOMMODATION_MAIN_LOCATION_ARRAY.filter(
    (item) => item.value !== AccommodationMainLocation.ALL,
  );
  const SUB_LOCATION_ARRAY = ACCOMMODATION_SUB_LOCATION_ARRAY.filter(
    (item) => item.value !== "전체",
  );

  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">기본 설정</p>
      <div>
        <ShortRow label="숙소 유형" value={""} size="lg">
          <CustomSelectField
            form={form}
            name="category"
            placeholder="숙소 유형을 선택해주세요"
            selectValue={CATEGORY_ARRAY}
          />
        </ShortRow>
        <ShortRow label="대분류" value={""} size="lg">
          <CustomSelectField
            form={form}
            name="mainLocation"
            placeholder="대분류를 선택해주세요"
            selectValue={MAIN_LOCATION_ARRAY}
          />
        </ShortRow>
        <ShortRow label="소분류" value={""} size="lg">
          <CustomSelectField
            form={form}
            name="subLocation"
            placeholder="소분류를 선택해주세요"
            selectValue={SUB_LOCATION_ARRAY}
          />
        </ShortRow>
        <ShortRow label="태그" value={""} size="lg">
          <div className="w-full py-3">
            <CustomTagField
              form={form}
              maxTags={2}
              maxLength={6}
              name="itemTags"
              placeholder="태그를 입력해주세요. (엔터키로 태그 추가)"
            />
          </div>
        </ShortRow>
        <ShortRow label="기본 주소" value={""} size="lg">
          <CustomInputField
            form={form}
            name="address1"
            placeholder="기본 주소를 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="상세 주소" value={""} size="lg">
          <CustomInputField
            form={form}
            name="address2"
            placeholder="상세 주소를 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="업체명" value={""} size="lg">
          <CustomInputField
            form={form}
            name="name"
            placeholder="업체명을 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="업체 소개" value={""} size="lg">
          <div className="w-full py-5">
            <QuillEditor
              value={form.getValues("content")}
              onChange={(content) => form.setValue("content", content)}
              placeholder="내용을 입력해주세요"
              height="200px"
            />
          </div>
        </ShortRow>
        <ShortRow label="담당자 이름" value={""} size="lg">
          <CustomInputField
            form={form}
            name="managerName"
            placeholder="담당자 이름을 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="담당자 연락처" value={""} size="lg">
          <CustomInputField
            form={form}
            type="tel"
            maxLength={13}
            name="managerPhoneNumber"
            placeholder="담당자 연락처를 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="관련링크" value={""} size="lg">
          <CustomInputField
            form={form}
            name="relatedLink"
            placeholder="관련링크를 입력해주세요"
          />
        </ShortRow>

        <ShortRow isLastRow label="썸네일" value={""} size="lg">
          <ImageInputField
            form={form}
            name="thumbnailUrl"
            description="이미지를 업로드해주세요 ( 1:1 정방향 이미지 )"
            imageSpec="최대 5MB의 JPG,JPEG,PNG,WEBP 이미지 파일"
          />
        </ShortRow>
      </div>
    </div>
  );
};

export default BasicForm;
