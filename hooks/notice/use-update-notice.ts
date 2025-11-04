import useSWR from "swr";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { NOTICE_DETAIL_PAGE } from "@/constants/path";
import { useEffect, useState } from "react";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { noticeSchema } from "@/schema/notice";
import {
  EventCreateReq,
  NoticeCreateReq,
  NoticeItem,
  NoticeType,
} from "@/app/api/dto/notice";
import { getNoticeDetail, updateNotice } from "@/app/api/notice";
import { convertEditorImages } from "@/util/quill";

export const useUpdateNotice = (noticeId?: string) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.BANNER);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof noticeSchema>>({
    resolver: zodResolver(noticeSchema),
  });

  // 배너 상세 정보 조회
  const key = noticeId ? ["notice", noticeId] : null;
  const { data: noticeDetail, error } = useSWR<NoticeItem, Error>(
    key,
    () => getNoticeDetail(noticeId!),
    {
      suspense: isClient,
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 0, // 중복 제거 비활성화
    },
  );

  // 폼에 기존 데이터 설정
  useEffect(() => {
    if (noticeDetail && !isFormInitialized) {
      // 약간의 지연을 두고 폼 리셋 (렌더링 완료 후)
      setTimeout(() => {
        form.reset({
          ...noticeDetail,
          thumbnailUrl:
            noticeDetail.type === NoticeType.EVENT
              ? noticeDetail.thumbnailUrl || undefined
              : undefined,
          isActive: String(noticeDetail.isActive),
        });
        setIsFormInitialized(true);
      }, 100);
    }
  }, [noticeDetail, form, isFormInitialized]);

  // 컴포넌트가 언마운트될 때 초기화 상태 리셋
  useEffect(() => {
    return () => {
      setIsFormInitialized(false);
    };
  }, []);

  const mutate = async (data: z.infer<typeof noticeSchema>) => {
    setIsLoading(true);
    try {
      let reqData: NoticeCreateReq | EventCreateReq;
      let thumbnailUrl = data.thumbnailUrl;

      if (data.type === NoticeType.NOTICE) {
        reqData = {
          ...data,
          isActive: data.isActive === "true",
        };
      } else {
        // 이미지가 File 객체인 경우 S3에 업로드
        if (data.thumbnailUrl instanceof File) {
          const fileArray = await onPostS3PresignedUrl([data.thumbnailUrl]);
          thumbnailUrl = fileArray[0];
        }

        reqData = {
          ...data,
          thumbnailUrl,
          isActive: data.isActive === "true",
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

      await updateNotice(noticeId!, reqData);
      toast({
        title: "게시글이 수정되었어요",
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      router.replace(NOTICE_DETAIL_PAGE.replace("[id]", noticeId!));
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = form.handleSubmit(mutate);

  return {
    form,
    onSubmit,
    isLoading: isLoading || (!noticeDetail && !error),
  };
};
