"use client";

import PageCrumble from "@/app/_components/page-crumble";
import ExperienceForm from "../_components/experience-form";
import { useParams } from "next/navigation";

const EditExperiencePage = () => {
  const params = useParams();
  const experienceId = params.id as string;

  return (
    <div className="flex flex-col gap-8 p-10">
      <div className="flex flex-col gap-2">
        <PageCrumble
          props={{
            type: "original",
            path: "여행 상품 수정",
            icon: "product",
          }}
        />
        <PageCrumble
          props={{
            type: "second",
            path: ["여행 관리", "여행 상세"],
          }}
        />
      </div>
      <ExperienceForm mode="edit" experienceId={experienceId} />
    </div>
  );
};

export default EditExperiencePage;
