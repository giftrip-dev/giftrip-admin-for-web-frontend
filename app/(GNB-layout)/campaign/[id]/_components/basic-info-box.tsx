import QuillViewer from "@/app/_components/editor/quill-viewer";
import Image from "next/image";
import ShortRow from "@/app/_components/table/short-row";
import { CampaignItem } from "@/app/api/dto/campaign";

interface BasicInfoBoxProps {
  data: CampaignItem;
}

const BasicInfoBox = ({ data }: BasicInfoBoxProps) => {
  const itemTags = data.itemTags ? data.itemTags.join(", ") : "-";
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">기본 정보</p>
      <div>
        <ShortRow size="md" label="체험명" value={data.title} />
        <ShortRow size="md" label="태그" value={itemTags} />
        <ShortRow size="md" label="장소" value={data.address1} />
        <ShortRow size="md" label="상품 소개" value={data.description} />
        <ShortRow
          size="md"
          label="담당자 연락처"
          value={data.managerPhoneNumber}
        />
        <ShortRow size="md" label="관련 링크" value={data.relatedLink || "-"} />
        <ShortRow size="md" label="상세 설명" value={""}>
          <QuillViewer content={data.content} />
        </ShortRow>
        <ShortRow isLastRow size="md" label="썸네일" value={""}>
          {data.thumbnailUrl && (
            <Image
              className="py-4"
              src={data.thumbnailUrl}
              alt="체험 썸네일"
              width={268}
              height={268}
            />
          )}
        </ShortRow>
      </div>
    </div>
  );
};

export default BasicInfoBox;
