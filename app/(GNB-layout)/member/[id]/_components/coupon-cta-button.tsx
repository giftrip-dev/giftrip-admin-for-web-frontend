import { Button } from "@/components/ui/button";
import { useState } from "react";
import CouponModal from "../../../coupon/_components/modal/coupon-modal";

const CouponCtaButton = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size={"sm"} onClick={() => setIsOpen(true)}>
        쿠폰 관리
      </Button>
      <CouponModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userId={userId}
      />
    </>
  );
};

export default CouponCtaButton;
