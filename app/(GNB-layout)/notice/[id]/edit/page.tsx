"use client";

import PageCrumble from "@/app/_components/page-crumble";
import NoticeForm from "../../_components/notice-form";
import { useParams } from "next/navigation";

const EditNoticePage = () => {
  const params = useParams();
  const noticeId = params.id as string;

  return (
    <div className="flex flex-col gap-8 pt-3">
      <PageCrumble
        props={{
          type: "second",
          path: ["게시판 관리", "게시판 상세"],
        }}
      />
      <NoticeForm mode="edit" noticeId={noticeId} />
    </div>
  );
};

export default EditNoticePage;
