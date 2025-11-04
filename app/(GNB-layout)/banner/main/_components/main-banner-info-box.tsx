import ShortRow from "@/app/_components/table/short-row";
import { BannerItem } from "@/app/api/dto/banner";
import { BANNER_CATEGORY_LABEL } from "@/constants/banner";
import Image from "next/image";

const MainBannerInfoBox = ({ banner }: { banner: BannerItem }) => {
  return (
    <>
      <ShortRow size="md" label="배너명" value={banner.title} />
      <ShortRow
        size="md"
        label="카테고리"
        value={BANNER_CATEGORY_LABEL[banner.itemType]}
      />
      <ShortRow size="md" label="출력 순서" value={banner.displayOrder} />
      <ShortRow
        size="md"
        label="공개 상태"
        value={banner.isActive ? "공개" : "비공개"}
      />
      <ShortRow isLastRow size="md" label="배너 이미지" value={""}>
        <Image
          className="py-4"
          src={banner.imageUrl}
          alt="배너 이미지"
          width={300}
          height={300}
        />
      </ShortRow>
    </>
  );
};

export default MainBannerInfoBox;
