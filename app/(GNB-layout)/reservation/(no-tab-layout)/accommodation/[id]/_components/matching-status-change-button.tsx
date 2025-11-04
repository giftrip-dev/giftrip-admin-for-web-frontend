import { useState } from "react";
import { Button } from "@/components/ui/button";
import MatchingStatusChangeModal from "./matching-status-change-modal";
import { AccommodationMatchingStatus } from "@/app/api/dto/reservation";

interface MatchingStatusChangeButtonProps {
  id: string;
  status: AccommodationMatchingStatus;
}

const MatchingStatusChangeButton = ({
  id,
  status,
}: MatchingStatusChangeButtonProps) => {
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
      <MatchingStatusChangeModal
        open={open}
        onClose={() => setOpen(false)}
        id={id}
        status={status}
      />
    </>
  );
};

export default MatchingStatusChangeButton;
