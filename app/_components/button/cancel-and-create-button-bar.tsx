import { Button } from "@/components/ui/button";

interface CancelAndCreateButtonBarProps {
  cancelButtonText?: string;
  createButtonText?: string;
  onClickCancel?: () => void;
  onClickCreate?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const CancelAndCreateButtonBar = ({
  cancelButtonText = "취소",
  createButtonText = "생성",
  onClickCancel,
  onClickCreate,
  isLoading,
  isDisabled,
}: CancelAndCreateButtonBarProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button type="button" variant="outline" onClick={onClickCancel}>
        {cancelButtonText}
      </Button>
      <Button
        disabled={isLoading || isDisabled}
        type="button"
        onClick={onClickCreate}
      >
        {createButtonText}
      </Button>
    </div>
  );
};

export default CancelAndCreateButtonBar;
