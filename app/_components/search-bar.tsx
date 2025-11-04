import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import FilterName from "./table/filter-name";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder: string;
  setKeyword: (val: string) => void;
  keyword: string;
  resetAllFilters: () => void;
}

const SearchBar = ({
  placeholder,
  setKeyword,
  keyword,
  resetAllFilters,
}: SearchBarProps) => {
  // 로컬 상태
  const [inputValue, setInputValue] = useState(keyword);

  // 부모 컴포넌트에서 keyword가 변경되면 로컬 상태 업데이트
  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  // 검색어 변경 핸들러
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 검색 트리거 핸들러
  const applySearch = () => {
    setKeyword(inputValue);
  };

  // 엔터 키 입력 핸들러
  const keyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applySearch();
    }
  };

  // 초기화 핸들러
  const onReset = () => {
    setInputValue("");
    resetAllFilters();
  };

  return (
    <div className="flex items-center border">
      <FilterName name="상세 검색" />
      <div className="relative flex w-[430px] items-center gap-2 pl-3">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={changeValue}
          onKeyDown={keyDownInput}
        />
        <Button type="button" onClick={applySearch} size="lg">
          검색
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onReset}>
          초기화
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
