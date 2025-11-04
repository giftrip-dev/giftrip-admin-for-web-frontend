import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import FilterName from "./table/filter-name";

interface SelectBoxProps {
  noBottomBorder?: string;
  conditions: {
    value: string;
    label: string;
  }[];
  label?: string;
  selectClass?: string;
  handleChangeValue: (data: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
}

const SelectBox = ({
  noBottomBorder,
  selectClass,
  conditions,
  label,
  handleChangeValue,
  defaultValue,
  disabled,
  placeholder = "선택",
  value,
}: SelectBoxProps) => {
  const [_value, setValue] = useState(defaultValue || "");

  // 부모 컴포넌트에서 value가 변경되면 상태 업데이트
  useEffect(() => {
    setValue(value || defaultValue || "");
  }, [value, defaultValue]);

  // 값 변경 핸들러
  const changeValue = (val: string) => {
    setValue(val);
    handleChangeValue(val);
  };

  return (
    <div
      className={`flex h-[72px] ${
        noBottomBorder ? "border-x" : "border-x border-b"
      } ${selectClass}`}
    >
      {label && <FilterName name={label} />}
      <div className="flex items-center pl-[15px]">
        <Select
          onValueChange={changeValue}
          value={_value}
          disabled={disabled}
          defaultValue={defaultValue || conditions[0]?.value}
        >
          <SelectTrigger
            className={_value ? "" : "[&>span]:text-black/40"}
            style={{ minWidth: 120 }}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {conditions.map((condition) => (
                <SelectItem key={condition.value} value={condition.value}>
                  {condition.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectBox;
