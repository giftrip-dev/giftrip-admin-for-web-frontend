import { Form, FormField, FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { AccommodationMatchingStatus } from "@/app/api/dto/reservation";
import { UseFormReturn } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import StatusChip from "@/app/_components/chip/status-chip";

interface MatchingStatusChangeFormProps {
  form: UseFormReturn<{ matchingStatus: AccommodationMatchingStatus }>;
}

const MatchingStatusChangeForm = ({ form }: MatchingStatusChangeFormProps) => {
  return (
    <Form {...form}>
      <div className="">
        <FormField
          control={form.control}
          name="matchingStatus"
          render={({ field }) => (
            <FormItem className="border-none">
              <FormLabel className="sr-only">매칭 상태</FormLabel>
              <FormControl className="border-none">
                <div className="">
                  <MatchingStatusCheckBox
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

const MatchingStatusCheckBox = ({
  value,
  handleChangeValue,
}: {
  value: AccommodationMatchingStatus;
  handleChangeValue: (value: AccommodationMatchingStatus) => void;
}) => {
  const deliveryStatusOptions = [
    {
      value: AccommodationMatchingStatus.PENDING,
      label: "매칭 대기",
    },
    {
      value: AccommodationMatchingStatus.MATCHED,
      label: "매칭 완료",
    },
  ];

  const getStatusColor = (status: string): "green" | "blue" => {
    return status === AccommodationMatchingStatus.MATCHED ? "blue" : "green";
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

export default MatchingStatusChangeForm;
