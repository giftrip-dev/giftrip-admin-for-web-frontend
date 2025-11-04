"use client";

import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/shared/loading/loading";
import ProductCtaButtonList from "@/app/_components/button/product-cta-button-list";
import { useDeleteNotice } from "@/hooks/notice/use-delete-notice";
import { NOTICE_EDIT_PAGE, NOTICE_PAGE } from "@/constants/path";
import PageCrumble from "@/app/_components/page-crumble";
import NoticeDetailContainer from "../_components/notice-detail-container";

const NoticeDetailPage = () => {
  const { id } = useParams();
  const { onSubmit, loading } = useDeleteNotice();
  const router = useRouter();

  // 수정 버튼 핸들러
  const clickEdit = () => {
    router.push(NOTICE_EDIT_PAGE.replace("[id]", id as string));
  };

  // 삭제 버튼 핸들러
  const clickDelete = () => {
    onSubmit(id as string);
  };

  // 목록 버튼 핸들러
  const clickBackToList = (prev: string) => {
    router.push(`${NOTICE_PAGE}?prev=${prev}`);
  };

  return (
    <div className="pt-3">
      <PageCrumble
        props={{
          type: "second",
          path: ["게시판 관리", "게시판 상세"],
        }}
      />
      <ProductCtaButtonList
        clickBackToList={clickBackToList}
        clickDelete={clickDelete}
        clickEdit={clickEdit}
        loading={loading}
        modalTitle="게시글 삭제"
      />
      <Loading>
        <NoticeDetailContainer id={id as string} />
      </Loading>
    </div>
  );
};

export default NoticeDetailPage;
