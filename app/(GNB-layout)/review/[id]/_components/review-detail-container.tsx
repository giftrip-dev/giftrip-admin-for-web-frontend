import { useGetReviewDetail } from "@/hooks/review/use-get-review-detail";
import ReviewInfoBox from "./review-info-box";
import ProductInfoBox from "./product-info-box";
import ProductCtaButtonList from "@/app/_components/button/product-cta-button-list";
import ReviewStatusChangeModal from "./review-status-change-modal";
import { useDeleteReview } from "@/hooks/review/use-delete-review";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { REVIEW_PAGE } from "@/constants/path";

const ReviewDetailContainer = ({ id }: { id: string }) => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const [open, setOpen] = useState(false);
  const { onSubmit, loading } = useDeleteReview();

  const { data } = useGetReviewDetail(id);
  const router = useRouter();

  // 삭제 버튼 핸들러
  const clickDelete = () => {
    onSubmit(id as string);
  };

  // 목록 버튼 핸들러
  const clickBackToList = (prev: string) => {
    router.push(`${REVIEW_PAGE}/${category}?prev=${prev}`);
  };

  // 수정 버튼 핸들러
  const clickEdit = () => {
    setOpen(true);
  };

  if (!data) return null;

  return (
    <>
      <div className="absolute right-0 top-0">
        <ProductCtaButtonList
          clickBackToList={clickBackToList}
          clickDelete={clickDelete}
          clickEdit={clickEdit}
          loading={loading}
          modalTitle="리뷰 삭제"
        />
      </div>
      <ReviewStatusChangeModal
        open={open}
        onClose={() => setOpen(false)}
        id={id as string}
        status={data.isActive ? "true" : "false"}
      />
      <div className="mt-8 flex flex-col gap-8">
        <ProductInfoBox review={data} />
        <ReviewInfoBox review={data} />
      </div>
    </>
  );
};

export default ReviewDetailContainer;
