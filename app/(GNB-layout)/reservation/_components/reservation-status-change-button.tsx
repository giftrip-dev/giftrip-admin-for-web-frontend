import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReservationStatus } from "@/app/api/dto/reservation";
import { ProductType } from "@/constants/product";
import ReservationStatusChangeModal from "./reservation-status-change-modal";

interface ReservationStatusChangeButtonProps {
  id: string;
  status: ReservationStatus;
  type: ProductType;
}

const ReservationStatusChangeButton = ({
  id,
  status,
  type,
}: ReservationStatusChangeButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="h-[25px] px-3 text-caption"
        variant={"outline"}
        onClick={() => setOpen(true)}
      >
        상태 변경
      </Button>
      <ReservationStatusChangeModal
        open={open}
        onClose={() => setOpen(false)}
        id={id}
        status={status}
        type={type}
      />
    </>
  );
};

export default ReservationStatusChangeButton;
