import { Form, FormField, FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { DeliveryStatus } from "@/app/api/dto/order";
import { UseFormReturn } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import StatusChip from "@/app/_components/chip/status-chip";

interface DeliveryStatusChangeFormProps {
  form: UseFormReturn<{ deliveryStatus: DeliveryStatus }>;
}

const DeliveryStatusChangeForm = ({ form }: DeliveryStatusChangeFormProps) => {
  return (
    <Form {...form}>
      <div className="">
        <FormField
          control={form.control}
          name="deliveryStatus"
          render={({ field }) => (
            <FormItem className="border-none">
              <FormLabel className="sr-only">배송 상태</FormLabel>
              <FormControl className="border-none">
                <div className="">
                  <DeliveryStatusCheckBox
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

const DeliveryStatusCheckBox = ({
  value,
  handleChangeValue,
}: {
  value: DeliveryStatus;
  handleChangeValue: (value: DeliveryStatus) => void;
}) => {
  const deliveryStatusOptions = [
    {
      value: DeliveryStatus.PENDING,
      label: "상품 준비중",
    },
    {
      value: DeliveryStatus.SHIPPED,
      label: "출고 완료",
    },
  ];

  const getStatusColor = (status: string): "green" | "blue" => {
    return status === DeliveryStatus.SHIPPED ? "blue" : "green";
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

export default DeliveryStatusChangeForm;
