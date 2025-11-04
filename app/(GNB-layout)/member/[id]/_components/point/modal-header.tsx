import PageCrumble from "@/app/_components/page-crumble";
import { Button } from "@/components/ui/button";

const ModalHeader = ({
  onClose,
  disabled,
}: {
  onClose: () => void;
  disabled: boolean;
}) => {
  return (
    <div className="flex justify-between gap-4">
      <PageCrumble
        props={{
          type: "original",
          icon: "coupon",
          path: "포인트 지급",
        }}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" onClick={onClose} variant="outline">
          취소
        </Button>
        <Button type="submit" disabled={disabled}>
          지급
        </Button>
      </div>
    </div>
  );
};

export default ModalHeader;
