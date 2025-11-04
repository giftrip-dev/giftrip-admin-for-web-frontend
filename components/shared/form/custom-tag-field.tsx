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
import { X } from "lucide-react";

interface CustomTagFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  maxTags?: number; // 최대 태그 수
  className?: string;
  tagClassName?: string; // 태그 스타일 클래스
  maxLength?: number;
}

const CustomTagField = <T extends FieldValues>({
  form,
  name,
  placeholder = "태그를 입력해주세요. (엔터키로 태그 추가)",
  label,
  disabled,
  maxTags = 10,
  className,
  tagClassName,
  maxLength = 10,
}: CustomTagFieldProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  // 태그 추가 핸들러
  const addTag = (newTag: string, field: ControllerRenderProps<T, Path<T>>) => {
    const trimmedTag = newTag.trim();

    // 빈 태그 방지
    if (!trimmedTag) return;

    const currentTags = (field.value as string[]) || [];

    // 중복 태그 방지
    if (currentTags.includes(trimmedTag)) {
      setInputValue("");
      return;
    }

    // 최대 태그 수 제한
    if (currentTags.length >= maxTags) {
      setInputValue("");
      return;
    }

    // 새 태그 추가
    const updatedTags = [...currentTags, trimmedTag];
    field.onChange(updatedTags);
    setInputValue("");
  };

  // 태그 삭제 핸들러
  const removeTag = (
    tagToRemove: string,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    const currentTags = (field.value as string[]) || [];
    const updatedTags = currentTags.filter(
      (tag: string) => tag !== tagToRemove,
    );
    field.onChange(updatedTags);
  };

  // 키보드 이벤트 핸들러
  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    // IME 조합 중일 때는 이벤트 처리하지 않음
    if (isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      const noSpaceValue = inputValue.replace(/\s/g, "");
      addTag(noSpaceValue, field);
    } else if (e.key === "Backspace" && inputValue === "") {
      // 백스페이스로 마지막 태그 삭제
      const currentTags = (field.value as string[]) || [];
      if (currentTags.length > 0) {
        const updatedTags = currentTags.slice(0, -1);
        field.onChange(updatedTags);
      }
    }
  };

  // IME 조합 시작
  const onCompositionStart = () => {
    setIsComposing(true);
  };

  // IME 조합 종료
  const onCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          {label ? (
            <FormLabel className="mb-3 web:mb-2" htmlFor={name}>
              {label}
            </FormLabel>
          ) : (
            <FormLabel htmlFor={name} />
          )}
          <FormControl>
            <div className="space-y-2">
              <Input
                type="text"
                disabled={disabled || field.value?.length >= maxTags}
                id={name}
                maxLength={maxLength}
                className={`disabled:bg-black/10 ${className}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                onKeyDown={(e) => onKeyDown(e, field)}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
              />
              {/* 태그 개수 표시 */}
              <div className="text-title-3 text-status-clear">
                *태그는 {maxTags}개까지 설정 가능하며 최대 입력 길이는{" "}
                {maxLength}글자
              </div>
              {/* 태그 표시 영역 */}
              {field.value && (field.value as string[]).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(field.value as string[]).map(
                    (tag: string, index: number) => (
                      <div
                        key={index}
                        className={`inline-flex items-center gap-1 rounded-md bg-gray-100 px-[10px] py-1 text-sm ${tagClassName}`}
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag, field)}
                          disabled={disabled}
                          className="rounded-full p-0.5 disabled:opacity-50"
                        >
                          <X className="size-4 text-label-natural" />
                        </button>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomTagField;
