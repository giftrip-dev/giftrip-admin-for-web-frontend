"use client";

import PageCrumble from "@/app/_components/page-crumble";
import Loading from "@/components/shared/loading/loading";
import { useParams } from "next/navigation";
import ReviewDetailContainer from "./_components/review-detail-container";

const ReviewDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="mt-2">
      <div className="relative">
        <PageCrumble
          props={{ icon: "review", type: "original", path: "리뷰 관리" }}
        />
        <PageCrumble
          props={{
            type: "second",
            path: ["리뷰 관리", "리뷰 상세"],
          }}
        />
        <Loading>
          <ReviewDetailContainer id={id as string} />
        </Loading>
      </div>
    </div>
  );
};

export default ReviewDetailPage;
