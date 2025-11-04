import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { commaWithUnit } from "@/util/price";
import { phoneNumberFormatter } from "@/util/number";

interface CustomInputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  isValid?: boolean; // 유효성 검사 여부
  validText?: string; // 유효성 검사 텍스트
  maxLength?: number; // 최대 입력 가능 글자 수
  noSpace?: boolean; // 첫 글자 공백 입력 불가 여부
  label?: string; // 라벨
  disabled?: boolean; // 비활성화 여부
  type?: "number" | "email" | "text" | "password" | "tel" | "rate" | "price";
  className?: string; // 클래스명
  noMessage?: boolean; // 메시지 미표시 여부
}

const CustomInputField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  isValid,
  validText,
  maxLength,
  label,
  disabled,
  type,
  className,
  // noMessage,
}: CustomInputFieldProps<T>) => {
  const [currentType, setCurrentType] = useState(type);
  const [isExposedPassword, setExposed] = useState(false);

  // 값 변경 핸들러
  const onChangeValue = (
    value: string,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    if (value.startsWith(" ")) {
      field.onChange(value.trim());
    } else {
      if (type === "tel") {
        const phone = phoneNumberFormatter(value);
        return field.onChange(phone);
      }
      if (type === "price") {
        const numericValue = value.replace(/[^0-9]/g, "");
        return field.onChange(numericValue);
      }
      if (type === "rate") {
        // 숫자만 허용하고 최대 100까지 제한
        const numericValue = value.replace(/[^0-9]/g, "");

        if (numericValue === "") {
          return field.onChange("");
        }

        // 선행 0 제거 (단, "0"은 허용)
        let cleanedValue = numericValue.replace(/^0+/, "");
        if (cleanedValue === "") {
          cleanedValue = "0";
        }

        const numberValue = parseInt(cleanedValue, 10);
        if (numberValue > 100) {
          return field.onChange("100");
        }

        return field.onChange(cleanedValue);
      }
      field.onChange(value);
    }
  };

  // rate 타입일 때 키보드 입력 제한
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "rate") {
      // 숫자(0-9), 백스페이스, 델리트, 탭, 화살표 키만 허용
      const allowedKeys = [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ];

      const isNumber = /^[0-9]$/.test(e.key);
      const isAllowedKey = allowedKeys.includes(e.key);
      const isCtrlA = e.ctrlKey && e.key === "a";
      const isCtrlC = e.ctrlKey && e.key === "c";
      const isCtrlV = e.ctrlKey && e.key === "v";
      const isCtrlX = e.ctrlKey && e.key === "x";

      if (
        !isNumber &&
        !isAllowedKey &&
        !isCtrlA &&
        !isCtrlC &&
        !isCtrlV &&
        !isCtrlX
      ) {
        e.preventDefault();
      }
    }
  };

  // 비밀번호 보기 핸들러
  const onClickCheckPassword = () => {
    if (currentType === "password") {
      setCurrentType("text");
    } else {
      setCurrentType("password");
    }
    setExposed(!isExposedPassword);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative ">
          {label ? (
            <FormLabel className="mb-3 web:mb-2" htmlFor={name}>
              {label}
            </FormLabel>
          ) : (
            <FormLabel htmlFor={name} />
          )}
          <FormControl>
            <div className="relative">
              <Input
                type={currentType === "rate" ? "number" : currentType}
                disabled={disabled}
                id={name}
                maxLength={maxLength}
                className={` disabled:bg-black/10 ${!isValid && validText ? "border-destructive focus-visible:border-destructive" : ""} ${className}`}
                {...field}
                value={
                  type === "price" && field.value
                    ? commaWithUnit(field.value)
                    : (field.value ?? "")
                }
                onChange={(e) => onChangeValue(e.target.value, field)}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
              />
              {type === "password" && (
                <button
                  onClick={onClickCheckPassword}
                  type="button"
                  className="absolute inset-y-0 right-0 z-10 my-auto mr-4"
                >
                  {!isExposedPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default CustomInputField;
