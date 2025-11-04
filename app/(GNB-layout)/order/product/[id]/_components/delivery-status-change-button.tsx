import { useState } from "react";
import { Button } from "@/components/ui/button";
import DeliveryStatusChangeModal from "./delivery-status-change-modal";
import { DeliveryStatus } from "@/app/api/dto/order";

interface DeliveryStatusChangeButtonProps {
  id: string;
  status: DeliveryStatus;
}

const DeliveryStatusChangeButton = ({
  id,
  status,
}: DeliveryStatusChangeButtonProps) => {
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
      <DeliveryStatusChangeModal
        open={open}
        onClose={() => setOpen(false)}
        id={id}
        status={status}
      />
    </>
  );
};

export default DeliveryStatusChangeButton;
