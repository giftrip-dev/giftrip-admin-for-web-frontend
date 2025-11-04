"use client";

import PageCrumble from "@/app/_components/page-crumble";
import AccommodationForm from "../_components/accommodation-form";
import { useParams, useSearchParams } from "next/navigation";

const EditExperiencePage = () => {
  const params = useParams();
  const prev = useSearchParams().get("prev") || "1";
  const accommodationId = params.id as string;

  return (
    <div className="flex flex-col gap-8 p-10">
      <div className="flex flex-col gap-2">
        <PageCrumble
          props={{
            type: "original",
            path: "숙소 상품 수정",
            icon: "product",
          }}
        />
        <PageCrumble
          props={{
            type: "second",
            path: ["숙소 상품 관리", "숙소 상품 상세"],
          }}
        />
      </div>
      <AccommodationForm
        mode="edit"
        accommodationId={accommodationId}
        prev={prev}
      />
    </div>
  );
};

export default EditExperiencePage;
