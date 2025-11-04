import PageCrumble from "@/app/_components/page-crumble";
import NoticeForm from "../_components/notice-form";

const NewNoticePage = () => {
  return (
    <div className="flex flex-col gap-8 pt-3">
      <PageCrumble
        props={{
          type: "second",
          path: ["게시판 관리", "게시판 생성"],
        }}
      />
      <NoticeForm mode="create" />
    </div>
  );
};

export default NewNoticePage;
