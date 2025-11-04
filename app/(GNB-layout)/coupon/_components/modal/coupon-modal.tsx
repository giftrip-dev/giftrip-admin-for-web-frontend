import { ModalHeaderForUser } from "./modal-header";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CouponFilterBox from "./coupon-filter-box";
import CouponTableContainerForUser from "./coupon-table-container-for-user";

const CouponModal = ({
  isOpen,
  onClose,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  });
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null); // 선택된 쿠폰 ID

  // 쿠폰 모달 닫기 핸들러
  const closeModal = () => {
    setSelectedCouponId(null);
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
        <div className="flex w-[1000px] flex-col gap-8 overflow-x-auto rounded-lg bg-white p-6">
          <ModalHeaderForUser
            userId={userId}
            selectedCouponId={selectedCouponId}
            onClose={closeModal}
          />
          <CouponFilterBox
            setCurrentPage={setCurrentPage}
            keyword={keyword}
            duration={duration}
            setKeyword={setKeyword}
            setDuration={setDuration}
          />
          <CouponTableContainerForUser
            selectedCouponId={selectedCouponId}
            setSelectedCouponId={setSelectedCouponId}
            keyword={keyword}
            duration={duration}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    ) : null,
    document.getElementById("portal-root") || document.body,
  );
};

export default CouponModal;
