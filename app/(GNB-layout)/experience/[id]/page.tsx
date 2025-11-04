"use client";

import Loading from "@/components/shared/loading/loading";
import DetailInfoContainer from "../_components/detail-info-container";
import { useParams } from "next/navigation";

const ExperienceProductDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="relative min-h-screen">
      <Loading>
        <DetailInfoContainer id={id as string} />
      </Loading>
    </div>
  );
};

export default ExperienceProductDetailPage;
