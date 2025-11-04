import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { useRouter } from "next/navigation";
import { NOTICE_PAGE } from "@/constants/path";
import { useState } from "react";
import { noticeSchema } from "@/schema/notice";
import { createNotice } from "@/app/api/notice";
import { convertEditorImages } from "@/util/quill";
import {
  EventCreateReq,
  NoticeCreateReq,
  NoticeType,
} from "@/app/api/dto/notice";

// 게시판 생성 요청 훅
export const usePostNotice = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.NOTICE);
  const form = useForm<z.infer<typeof noticeSchema>>({
    resolver: zodResolver(noticeSchema),
  });

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof noticeSchema>) => {
      try {
        setIsLoading(true);
        let reqData: NoticeCreateReq | EventCreateReq;

        // 공지사항일 경우 썸네일 선택
        if (data.type === NoticeType.NOTICE) {
          reqData = {
            ...data,
            isActive: data.isActive === "true" ? true : false,
          };
        } else {
          // 이벤트일 경우 썸네일 필수
          const fileArray = await onPostS3PresignedUrl([
            data.thumbnailUrl as File,
          ]);
          const newImage = fileArray[0];
          reqData = {
            ...data,
            thumbnailUrl: newImage,
            isActive: data.isActive === "true" ? true : false,
          };
        }

        // 퀼 에디터의 내용 추출
        const contentHtml = data.content || "";

        // 퀼 에디터의 이미지 src 교체
        const updatedContent = await convertEditorImages(
          contentHtml,
          onPostS3PresignedUrl,
        );

        reqData.content = updatedContent;

        await createNotice(reqData);
        router.replace(NOTICE_PAGE);
        await new Promise((resolve) => setTimeout(resolve, 200));
        toast({ title: "게시글이 생성되었어요" });
        form.reset();
      } catch (error) {
        console.error("게시글 생성 실패:", error);
        toast({ title: "잠시 후 다시 시도해주세요" });
      } finally {
        setIsLoading(false);
      }
    },
  );

  return { form, onSubmit, isLoading };
};
