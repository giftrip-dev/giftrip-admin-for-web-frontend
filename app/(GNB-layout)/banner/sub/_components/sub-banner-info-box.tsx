import ShortRow from "@/app/_components/table/short-row";
import { BannerItem } from "@/app/api/dto/banner";
import Image from "next/image";

const SubBannerInfoBox = ({ banner }: { banner: BannerItem }) => {
  const section = banner.displayOrder === 0 ? "상단" : "하단";
  return (
    <>
      <ShortRow size="md" label="배너명" value={banner.title} />
      <ShortRow size="md" label="섹션" value={section} />
      <ShortRow
        size="md"
        label="공개 상태"
        value={banner.isActive ? "공개" : "비공개"}
      />
      <ShortRow isLastRow size="md" label="배너 이미지" value={""}>
        <div className="relative h-[124px] w-[268px]">
          <Image className="py-4" src={banner.imageUrl} alt="배너 상태" fill />
        </div>
      </ShortRow>
    </>
  );
};

export default SubBannerInfoBox;
