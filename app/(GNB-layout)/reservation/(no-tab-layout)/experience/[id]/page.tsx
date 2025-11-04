"use client";

import Loading from "@/components/shared/loading/loading";
import { useParams } from "next/navigation";
import ReservationDetailContainer from "./_components/reservation-detail-container";

const ReservationExperienceDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="relative min-h-screen">
      <Loading>
        <ReservationDetailContainer id={id as string} />
      </Loading>
    </div>
  );
};

export default ReservationExperienceDetailPage;
