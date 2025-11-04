"use client";

import { ImageInputField } from "@/components/shared/form/image-input-field";
import ShortRow from "@/app/_components/table/short-row";
import CustomInputField from "@/components/shared/form/custom-input-field";
import CustomRadioField from "@/components/shared/form/custom-radio-field";
import { Form } from "@/components/ui/form";
import { BANNER_ACTIVE_ARRAY_CREATE } from "@/constants/banner";
import CancelAndCreateButtonBar from "@/app/_components/button/cancel-and-create-button-bar";
import { useRouter } from "next/navigation";
import { NOTICE_DETAIL_PAGE, NOTICE_PAGE } from "@/constants/path";
import { usePostNotice } from "@/hooks/notice/use-post-notice";
import { useUpdateNotice } from "@/hooks/notice/use-update-notice";
import { NOTICE_TYPE_LABEL, NOTICE_TYPE_PARTIAL } from "@/constants/notice";
import { NoticeType } from "@/app/api/dto/notice";
import dynamic from "next/dynamic";

interface NoticeFormProps {
  mode: "create" | "edit";
  noticeId?: string;
}

const QuillEditor = dynamic(
  () => import("@/app/_components/editor/quill-editor"),
  {
    ssr: false,
  },
);

const NoticeForm = ({ mode, noticeId }: NoticeFormProps) => {
  const createNotice = usePostNotice();
  const updateNotice = useUpdateNotice(noticeId);
  const isCreate = mode === "create";

  const { form, onSubmit, isLoading } = isCreate ? createNotice : updateNotice;
  const router = useRouter();

  // 취소 버튼 핸들러
  const clickCancel = () => {
    if (isCreate) {
      router.push(NOTICE_PAGE);
    } else {
      router.push(NOTICE_DETAIL_PAGE.replace("[id]", noticeId as string));
    }
  };

  const buttonText = isCreate ? "생성" : "수정";

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <ShortRow label="제목" value={""} size="lg">
          <CustomInputField
            form={form}
            name="title"
            placeholder="게시글 제목을 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="게시글 유형" value={""} size="lg">
          <CustomRadioField
            form={form}
            direction="horizontal"
            name="type"
            radioValue={Object.values(NOTICE_TYPE_PARTIAL).map((item) => ({
              value: item,
              label: NOTICE_TYPE_LABEL[item],
            }))}
          />
        </ShortRow>
        <ShortRow label="내용" value={""} size="lg">
          <div className="w-full py-5">
            <QuillEditor
              value={form.getValues("content")}
              onChange={(content) => form.setValue("content", content)}
              placeholder="내용을 입력해주세요"
              height="200px"
            />
          </div>
        </ShortRow>
        {form.watch("type") === NoticeType.EVENT && (
          <ShortRow label="썸네일" value={""} size="lg">
            <ImageInputField
              form={form}
              name="thumbnailUrl"
              description="이미지를 업로드해주세요 ( 1:1 정방향 이미지 )"
              imageSpec="최대 5MB의 JPG,JPEG,PNG,WEBP 이미지 파일"
            />
          </ShortRow>
        )}
        <ShortRow isLastRow label="공개 여부" value={""} size="lg">
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

export default NoticeForm;
