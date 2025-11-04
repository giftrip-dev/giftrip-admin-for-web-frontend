import { Button } from "@/components/ui/button";

interface CreateCtaButtonProps {
  onClick: () => void;
  buttonText?: string;
}

const CreateCtaButton = ({
  onClick,
  buttonText = "생성하기",
}: CreateCtaButtonProps) => {
  return (
    <Button size={"lg"} onClick={onClick}>
      {buttonText}
    </Button>
  );
};

export default CreateCtaButton;
