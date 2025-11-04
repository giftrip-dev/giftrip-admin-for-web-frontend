"use client";

import PageCrumble from "@/app/_components/page-crumble";
import { useParams } from "next/navigation";
import SubBannerForm from "../../_components/sub-banner-form";

const EditSubBannerPage = () => {
  const params = useParams();
  const bannerId = params.id as string;

  return (
    <div className="flex flex-col gap-8 pt-3">
      <PageCrumble
        props={{
          type: "second",
          path: ["메인 배너 관리", "메인 배너 상세"],
        }}
      />
      <SubBannerForm mode="edit" bannerId={bannerId} />
    </div>
  );
};

export default EditSubBannerPage;
