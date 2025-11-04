import PageCrumble from "@/app/_components/page-crumble";
import { Button } from "@/components/ui/button";
import { useApplyCouponToUser } from "@/hooks/coupon/use-apply-coupon-to-user";
import { AppliedCoupon, CouponItem } from "@/app/api/dto/coupon";

const ModalHeaderForUser = ({
  selectedCouponId,
  onClose,
  userId,
}: {
  selectedCouponId: string | null;
  onClose: () => void;
  userId: string;
}) => {
  const { onSubmit, isLoading } = useApplyCouponToUser();

  // 쿠폰 적용 핸들러
  const applyCoupon = () => {
    if (selectedCouponId) {
      onSubmit({ userId, couponId: selectedCouponId });
    }
  };
  return (
    <div className="flex justify-between gap-4">
      <PageCrumble
        props={{
          type: "original",
          icon: "coupon",
          path: "쿠폰 적용",
        }}
      />
      <div className="flex justify-end gap-2">
        <Button onClick={onClose} variant="outline">
          취소
        </Button>
        <Button onClick={applyCoupon} disabled={isLoading || !selectedCouponId}>
          적용
        </Button>
      </div>
    </div>
  );
};

const ModalHeaderForProduct = ({
  selectedCoupon,
  onClose,
  setCoupon,
}: {
  selectedCoupon: CouponItem | null;
  onClose: () => void;
  setCoupon: (coupon: AppliedCoupon) => void;
}) => {
  // 쿠폰 적용 핸들러
  const applyCoupon = () => {
    if (selectedCoupon) {
      // 선택된 쿠폰 정보를 AppliedCoupon 형태로 변환하여 업데이트
      const appliedCoupon: AppliedCoupon = {
        id: selectedCoupon.id,
        name: selectedCoupon.name,
        discountRate: selectedCoupon.discountRate,
        startDate: selectedCoupon.startDate || null,
        endDate: selectedCoupon.endDate || null,
      };
      setCoupon(appliedCoupon);
      onClose();
    }
  };

  return (
    <div className="flex justify-between gap-4">
      <PageCrumble
        props={{
          type: "original",
          icon: "coupon",
          path: "쿠폰 적용",
        }}
      />
      <div className="flex justify-end gap-2">
        <Button onClick={onClose} variant="outline">
          취소
        </Button>
        <Button onClick={applyCoupon} disabled={!selectedCoupon}>
          적용
        </Button>
      </div>
    </div>
  );
};

export { ModalHeaderForUser, ModalHeaderForProduct };
