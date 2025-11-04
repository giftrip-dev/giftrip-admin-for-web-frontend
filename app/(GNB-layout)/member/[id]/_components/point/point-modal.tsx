import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalHeader from "./modal-header";
import { Form } from "@/components/ui/form";
import ShortRow from "@/app/_components/table/short-row";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { useApplyPointToUser } from "@/hooks/point/use-apply-point-to-user";
import CustomTextareaField from "@/components/shared/form/custom-text-area-field";

const PointModal = ({
  isOpen,
  onClose,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}) => {
  const { onSubmit, isLoading, form } = useApplyPointToUser(userId, onClose);
  const [mounted, setMounted] = useState(false);

  // 포인트 모달 닫기 핸들러
  const closeModal = () => {
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
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <ModalHeader
                disabled={isLoading || !form.getValues("amount")}
                onClose={closeModal}
              />
              <div className="my-8 flex flex-col">
                <ShortRow size="md" label="포인트 지급" value={""}>
                  <CustomInputField
                    type="price"
                    form={form}
                    name="amount"
                    placeholder="포인트 지급"
                  />
                </ShortRow>
                <ShortRow isLastRow size="md" label="지급 사유" value={""}>
                  <div className="w-full py-4">
                    <CustomTextareaField
                      form={form}
                      name="description"
                      placeholder="지급 사유를 입력해주세요"
                    />
                  </div>
                </ShortRow>
              </div>
            </form>
          </Form>
        </div>
      </div>
    ) : null,
    document.getElementById("portal-root") || document.body,
  );
};

export default PointModal;
