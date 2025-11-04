import { Form, FormField, FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { ReservationStatus } from "@/app/api/dto/reservation";
import { UseFormReturn } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import StatusChip from "@/app/_components/chip/status-chip";

interface ReservationStatusChangeFormProps {
  form: UseFormReturn<{ status: ReservationStatus }>;
}

const ReservationStatusChangeForm = ({
  form,
}: ReservationStatusChangeFormProps) => {
  return (
    <Form {...form}>
      <div className="">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="border-none">
              <FormLabel className="sr-only">배송 상태</FormLabel>
              <FormControl className="border-none">
                <div className="">
                  <ReservationStatusCheckBox
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

const ReservationStatusCheckBox = ({
  value,
  handleChangeValue,
}: {
  value: ReservationStatus;
  handleChangeValue: (value: ReservationStatus) => void;
}) => {
  const deliveryStatusOptions = [
    {
      value: ReservationStatus.PAID,
      label: "예약 대기",
    },
    {
      value: ReservationStatus.CONFIRMED,
      label: "예약 확정",
    },
  ];

  const getStatusColor = (status: string): "green" | "blue" => {
    return status === ReservationStatus.PAID ? "green" : "blue";
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

export default ReservationStatusChangeForm;
