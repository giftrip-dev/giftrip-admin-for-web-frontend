import { Form, FormField, FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import StatusChip from "@/app/_components/chip/status-chip";

interface ReviewStatusChangeFormProps {
  form: UseFormReturn<{ isActive: string }>;
}

const ReviewStatusChangeForm = ({ form }: ReviewStatusChangeFormProps) => {
  return (
    <Form {...form}>
      <div className="">
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="border-none">
              <FormLabel className="sr-only">리뷰 상태</FormLabel>
              <FormControl className="border-none">
                <div className="">
                  <ReviewStatusCheckBox
                    value={field.value}
                    handleChangeValue={field.onChange}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

const ReviewStatusCheckBox = ({
  value,
  handleChangeValue,
}: {
  value: string;
  handleChangeValue: (value: string) => void;
}) => {
  const deliveryStatusOptions = [
    {
      value: "true",
      label: "노출",
    },
    {
      value: "false",
      label: "비노출",
    },
  ];

  const getStatusColor = (status: string): "green" | "blue" => {
    return status === "true" ? "blue" : "green";
  };

  return (
    <div className={`flex h-[72px]`}>
      <div className="flex">
        <ToggleGroup
          value={value}
          onValueChange={handleChangeValue} // 값 변경 핸들러 연결
          type="single"
          className={"flex-col gap-5"}
        >
          {deliveryStatusOptions.map((condition) => (
            <ToggleGroupItem
              key={condition.value}
              hasIcon
              checkType="square"
              value={condition.value}
              aria-label={condition.value}
            >
              <StatusChip
                status={condition.label}
                color={getStatusColor(condition.value)}
              />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default ReviewStatusChangeForm;
