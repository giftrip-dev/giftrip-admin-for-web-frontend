import { ModalHeaderForProduct } from "./modal-header";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CouponFilterBox from "./coupon-filter-box";
import CouponTableContainer from "./coupon-table-container";
import { CouponScope, CouponItem, AppliedCoupon } from "@/app/api/dto/coupon";
import { ProductType } from "@/constants/product";

const ProductCouponModal = ({
  isOpen,
  onClose,
  scope,
  setCoupon,
  itemType,
}: {
  isOpen: boolean;
  onClose: () => void;
  scope: CouponScope;
  setCoupon: (coupon: AppliedCoupon) => void;
  itemType: ProductType;
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  });
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null); // 선택된 쿠폰 ID
  const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(null); // 선택된 쿠폰 정보

  // 쿠폰 모달 닫기 핸들러
  const closeModal = () => {
    setSelectedCouponId(null);
    setSelectedCoupon(null);
    setKeyword("");
    setDuration({ start: undefined, end: undefined });
    setCurrentPage(1);
    onClose();
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    isOpen ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="flex min-h-[706px] w-[1000px] flex-col gap-8 overflow-x-auto rounded-lg bg-white p-6">
          <ModalHeaderForProduct
            selectedCoupon={selectedCoupon}
            onClose={closeModal}
            setCoupon={setCoupon}
          />
          <CouponFilterBox
            setCurrentPage={setCurrentPage}
            keyword={keyword}
            duration={duration}
            setKeyword={setKeyword}
            setDuration={setDuration}
          />
          <CouponTableContainer
            setSelectedCouponId={setSelectedCouponId}
            setSelectedCoupon={setSelectedCoupon}
            selectedCouponId={selectedCouponId}
            keyword={keyword}
            duration={duration}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            scope={scope}
            itemType={itemType}
          />
        </div>
      </div>
    ) : null,
    document.getElementById("portal-root") || document.body,
  );
};

export default ProductCouponModal;
