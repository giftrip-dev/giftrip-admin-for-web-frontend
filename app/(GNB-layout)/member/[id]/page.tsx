"use client";

import Loading from "@/components/shared/loading/loading";
import { useParams } from "next/navigation";
import MemberDetailContainer from "./_components/member-detail-container";

const MemberDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="relative min-h-screen">
      <Loading>
        <MemberDetailContainer id={id as string} />
      </Loading>
    </div>
  );
};

export default MemberDetailPage;
