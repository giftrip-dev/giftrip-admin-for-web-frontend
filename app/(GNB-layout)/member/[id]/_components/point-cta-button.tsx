import { Button } from "@/components/ui/button";
import { useState } from "react";
import PointModal from "./point/point-modal";

const PointCtaButton = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size={"sm"} onClick={() => setIsOpen(true)}>
        포인트 관리
      </Button>
      <PointModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userId={userId}
      />
    </>
  );
};

export default PointCtaButton;
