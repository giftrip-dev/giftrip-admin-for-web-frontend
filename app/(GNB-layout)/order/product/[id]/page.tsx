"use client";

import Loading from "@/components/shared/loading/loading";
import { useParams } from "next/navigation";
import OrderDetailInfoContainer from "../_components/order-detail-info-container";

const OrderProductDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="relative min-h-screen">
      <Loading>
        <OrderDetailInfoContainer id={id as string} />
      </Loading>
    </div>
  );
};

export default OrderProductDetailPage;
