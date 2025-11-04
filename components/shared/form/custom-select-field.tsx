import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface CustomSelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  selectValue: {
    value: string;
    label: string;
  }[];
  label?: string;
  disabled?: boolean;
  className?: string;
}

const CustomSelectField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  selectValue,
  label,
  disabled,
  className,
}: CustomSelectFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative flex flex-col gap-3">
          <FormControl>
            <>
              <FormLabel className={label ? "" : "sr-only"} htmlFor={name}>
                {label}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
                disabled={disabled}
              >
                <SelectTrigger
                  className={cn(
                    field.value ? "" : " [&>span]:text-black/40",
                    className,
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {selectValue.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default CustomSelectField;
