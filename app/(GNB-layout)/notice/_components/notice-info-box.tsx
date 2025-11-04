import QuillViewer from "@/app/_components/editor/quill-viewer";
import ShortRow from "@/app/_components/table/short-row";
import { NoticeItem, NoticeType } from "@/app/api/dto/notice";
import { NOTICE_TYPE_LABEL } from "@/constants/notice";
import formattedDate from "@/util/date";
import Image from "next/image";

const NoticeInfoBox = ({ notice }: { notice: NoticeItem }) => {
  return (
    <>
      <ShortRow
        size="md"
        label="게시글 유형"
        value={NOTICE_TYPE_LABEL[notice.type]}
      />
      <ShortRow
        size="md"
        label="등록일"
        value={formattedDate(notice.createdAt, "YYYY-MM-DD")}
      />
      <ShortRow size="md" label="제목" value={notice.title} />
      <ShortRow size="md" label="상세 설명" value={""}>
        <div className="py-5">
          <QuillViewer content={notice.content} />
        </div>
      </ShortRow>
      {notice.type === NoticeType.EVENT && (
        <ShortRow size="md" label="썸네일" value={""}>
          <Image
            className="py-4"
            src={notice.thumbnailUrl}
            alt="이벤트 썸네일"
            width={268}
            height={268}
          />
        </ShortRow>
      )}
      <ShortRow
        isLastRow
        size="md"
        label="공개 상태"
        value={notice.isActive ? "공개" : "비공개"}
      />
    </>
  );
};

export default NoticeInfoBox;
