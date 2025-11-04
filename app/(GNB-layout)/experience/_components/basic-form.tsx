import ShortRow from "@/app/_components/table/short-row";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { experienceProductSchema } from "@/schema/experience";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { ImageInputField } from "@/components/shared/form/image-input-field";
import dynamic from "next/dynamic";
import CustomTagField from "@/components/shared/form/custom-tag-field";

const QuillEditor = dynamic(
  () => import("@/app/_components/editor/quill-editor"),
  {
    ssr: false,
  },
);
interface BasicFormProps {
  form: UseFormReturn<z.infer<typeof experienceProductSchema>>;
}

const BasicForm = ({ form }: BasicFormProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">기본 설정</p>
      <div>
        <ShortRow label="상품명" value={""} size="lg">
          <CustomInputField
            form={form}
            name="title"
            placeholder="상품명을 입력해주세요"
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
        <ShortRow label="장소" value={""} size="lg">
          <CustomInputField
            form={form}
            name="address1"
            placeholder="장소를 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="상품 소개" value={""} size="lg">
          <CustomInputField
            form={form}
            name="description"
            placeholder="상품 소개를 입력해주세요"
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
        <ShortRow label="상세 설명" value={""} size="lg">
          <div className="w-full py-5">
            <QuillEditor
              value={form.getValues("content")}
              onChange={(content) => form.setValue("content", content)}
              placeholder="내용을 입력해주세요"
              height="200px"
            />
          </div>
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
