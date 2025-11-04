"use client";

import PageCrumble from "@/app/_components/page-crumble";
import CampaignForm from "../_components/campaign-form";
import { useParams, useSearchParams } from "next/navigation";

const EditExperiencePage = () => {
  const params = useParams();
  const prev = useSearchParams().get("prev") || "1";
  const campaignId = params.id as string;

  return (
    <div className="flex flex-col gap-8 p-10">
      <div className="flex flex-col gap-2">
        <PageCrumble
          props={{
            type: "original",
            path: "체험단 상품 수정",
            icon: "product",
          }}
        />
        <PageCrumble
          props={{
            type: "second",
            path: ["체험단 관리", "체험단 상세"],
          }}
        />
      </div>
      <CampaignForm mode="edit" campaignId={campaignId} prev={prev} />
    </div>
  );
};

export default EditExperiencePage;
