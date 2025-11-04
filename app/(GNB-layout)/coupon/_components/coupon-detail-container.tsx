import { useGetCouponDetail } from "@/hooks/coupon/use-get-coupon-detail";
import CouponInfoBox from "./coupon-info-box";

const CouponDetailContainer = ({ id }: { id: string }) => {
  const { data } = useGetCouponDetail(id);

  if (!data) return null;

  return (
    <div className="mt-8">
      <CouponInfoBox coupon={data} />
    </div>
  );
};

export default CouponDetailContainer;
