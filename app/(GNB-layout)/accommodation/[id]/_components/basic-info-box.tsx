import Image from "next/image";
import ShortRow from "@/app/_components/table/short-row";
import { AccommodationItem } from "@/app/api/dto/accommodation";
import formattedDate from "@/util/date";

interface BasicInfoBoxProps {
  data: AccommodationItem;
}

const BasicInfoBox = ({ data }: BasicInfoBoxProps) => {
  const itemTags = data.itemTags ? data.itemTags.join(", ") : "-";
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">기본 정보</p>
      <div>
        <ShortRow size="md" label="객실명" value={data.name} />
        <ShortRow size="md" label="태그" value={itemTags} />
        <ShortRow size="md" label="이용 시간" value={""}>
          <p className="w-full">
            체크인: {data.checkInTime.slice(0, 5)} ~ 체크아웃:{" "}
            {data.checkOutTime.slice(0, 5)}
          </p>
        </ShortRow>
        {/* 예약 가능일 */}
        <ShortRow size="md" label="예약 가능일" value={""}>
          <p className="w-full">
            {formattedDate(data.availableFrom)} ~{" "}
            {formattedDate(data.availableTo)}
          </p>
        </ShortRow>
        {/* 이용 최대 인원 */}
        <ShortRow size="md" label="이용 인원" value={""}>
          <p className="w-full">
            최소 인원: {data.minOccupancy}명 ~ 최대 인원: {data.maxOccupancy}명
          </p>
        </ShortRow>
        <ShortRow size="md" label="장소" value={data.accommodationName} />
        <ShortRow size="md" label="관련 링크" value={data.relatedLink || "-"} />
        <ShortRow isLastRow size="md" label="썸네일" value={""}>
          {data.imageUrls.length > 0 && (
            <Image
              className="py-4"
              src={data.imageUrls[0]}
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
