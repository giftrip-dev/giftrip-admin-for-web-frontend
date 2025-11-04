import ShortRow from "@/app/_components/table/short-row";
import { ShoppingItem } from "@/app/api/dto/shopping";
import { EXPOSURE_TAG_LABEL, ExposureTag } from "@/constants/product";
import { SHOPPING_CATEGORY_LABEL } from "@/constants/shopping";

interface DisplayInfoBoxProps {
  data: ShoppingItem;
}

const DisplayInfoBox = ({ data }: DisplayInfoBoxProps) => {
  const exposureTags = data.exposureTags
    ? data.exposureTags.map((tag) => EXPOSURE_TAG_LABEL[tag]).join(", ")
    : EXPOSURE_TAG_LABEL[ExposureTag.NONE];
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">표시 설정</p>
      <div>
        <ShortRow
          size="md"
          label="판매 상태"
          value={data.isActive ? "판매 중" : "판매 중지"}
        />
        <ShortRow
          size="md"
          label="상세 분류"
          value={SHOPPING_CATEGORY_LABEL[data.category]}
        />
        <ShortRow isLastRow size="md" label="진열 유형" value={exposureTags} />
      </div>
    </div>
  );
};

export default DisplayInfoBox;
