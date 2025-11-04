import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import FilterName from "./table/filter-name";

interface CheckBoxProps {
  noBottomBorder?: string; // 하단 보더 여부
  conditions: {
    value: string;
    label: string;
  }[]; // 체크박스 조건
  label?: string; // 라벨 이름
  checkboxClass?: string; // 추가 CSS 클래스
  handleChangeValue: (data: string) => void; // 값 변경 핸들러
  value: string;
}

const CheckBox = ({
  noBottomBorder,
  checkboxClass,
  conditions,
  label,
  value,
  handleChangeValue,
}: CheckBoxProps) => {
  return (
    <div
      className={`flex h-[72px] ${
        noBottomBorder ? "border-x" : "border-x border-b"
      } ${checkboxClass}`}
    >
      {label && <FilterName name={label} />}
      <div className="flex pl-[15px]">
        <ToggleGroup
          value={value}
          onValueChange={handleChangeValue} // 값 변경 핸들러 연결
          type="single"
          className="gap-6"
        >
          {conditions.map((condition) => (
            <ToggleGroupItem
              key={condition.value}
              hasIcon
              checkType="square"
              value={condition.value}
              aria-label={condition.value}
            >
              <p className="mt-px text-body-3">{condition.label}</p>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default CheckBox;
