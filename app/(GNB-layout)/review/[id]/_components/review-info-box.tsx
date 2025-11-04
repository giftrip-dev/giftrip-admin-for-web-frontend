import ShortRow from "@/app/_components/table/short-row";
import { ReviewItem } from "@/app/api/dto/review";
import Image from "next/image";

const ReviewInfoBox = ({ review }: { review: ReviewItem }) => {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-title-1">리뷰 상세 정보</p>
      <div>
        <ShortRow
          size="md"
          label="노출 여부"
          value={review.isActive ? "노출" : "비노출"}
        />
        <ShortRow size="md" label="별점" value={`${review.rating}/5`} />
        <ShortRow size="md" label="리뷰 내용" value={review.content} />
        <ShortRow isLastRow size="md" label="리뷰 이미지" value={""}>
          {review.imageUrls && review.imageUrls.length > 0 ? (
            <Image
              className="py-4"
              src={review.imageUrls[0]}
              alt="배너 이미지"
              width={300}
              height={300}
            />
          ) : null}
        </ShortRow>
      </div>
    </div>
  );
};

export default ReviewInfoBox;
