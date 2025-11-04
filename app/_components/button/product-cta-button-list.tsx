import { Button } from "@/components/ui/button";
import { useState } from "react";
import TwoButtonModal from "../modal/two-button-modal";
import { useSearchParams } from "next/navigation";

interface ProductCtaButtonListProps {
  clickBackToList: (prev: string) => void;
  clickDelete: () => void;
  clickEdit: () => void;
  loading?: boolean;
  noEdit?: boolean;
  modalTitle?: string;
}

const ProductCtaButtonList = ({
  clickBackToList,
  clickDelete,
  clickEdit,
  noEdit = false,
  loading,
  modalTitle,
}: ProductCtaButtonListProps) => {
  const prev = useSearchParams().get("prev") ?? "1";
  const [isOpen, setIsOpen] = useState(false);
  // 삭제 버튼 클릭 시 삭제 확인 모달 표시
  const handleDelete = () => {
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    clickDelete();
    setIsOpen(false);
  };

  return (
    <div className="sticky right-0 top-0 flex gap-2">
      <TwoButtonModal
        open={isOpen}
        onClickFirstBtn={() => setIsOpen(false)}
        onClickSecondBtn={handleConfirmDelete}
        loading={loading}
        title={modalTitle || "삭제"}
        desc="정말 삭제하시겠습니까?"
        buttonText="삭제"
      />
      <Button variant="label" size={"lg"} onClick={() => clickBackToList(prev)}>
        목록으로
      </Button>
      <Button
        variant="label"
        size={"lg"}
        onClick={handleDelete}
        disabled={loading}
      >
        삭제
      </Button>
      {!noEdit && (
        <Button
          variant="label"
          size={"lg"}
          onClick={clickEdit}
          disabled={loading}
        >
          수정
        </Button>
      )}
    </div>
  );
};

export default ProductCtaButtonList;
