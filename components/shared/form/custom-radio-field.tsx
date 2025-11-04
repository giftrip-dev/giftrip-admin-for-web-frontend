import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface CustomRadioFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  radioValue: {
    value: string;
    label: string;
  }[];
  defaultValue?: string;
  isEssential?: boolean; // 필수 여부
  direction: "vertical" | "horizontal";
}

const CustomRadioField = <T extends FieldValues>({
  form,
  name,
  radioValue,
  defaultValue,
  direction,
}: CustomRadioFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormControl>
            <>
              <RadioGroup
                defaultValue={defaultValue}
                value={field.value}
                onValueChange={field.onChange}
                className={
                  direction === "vertical"
                    ? "flex flex-col gap-4"
                    : "flex gap-6"
                }
              >
                {radioValue.map((value) => (
                  <Label
                    className="flex items-center gap-1.5"
                    key={value.value}
                  >
                    <RadioGroupItem value={value.value} id={value.value} />
                    <span className="text-body-2">{value.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </>
          </FormControl>
          <FormMessage className="-mb-6" />
        </FormItem>
      )}
    />
  );
};
export default CustomRadioField;
