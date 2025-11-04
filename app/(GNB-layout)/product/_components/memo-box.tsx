import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const MemoBox = ({
  memo,
  clickUpdate, // 메모 수정 핸들러
}: {
  memo: string;
  clickUpdate: () => void;
}) => {
  const [content, setContent] = useState(memo);
  const [isEdit, setIsEdit] = useState(false);

  const submitUpdate = () => {
    clickUpdate();
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-title-1">관리자 메모</p>
        <Button
          className="max-w-max"
          size={"md"}
          variant={"white"}
          onClick={submitUpdate}
        >
          {isEdit ? "저장" : "수정"}
        </Button>
      </div>
      <Textarea
        className="h-[120px] border-label-natural bg-label text-white placeholder:text-white focus-visible:ring-white"
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder="작성된 메모가 없습니다."
        value={content}
        disabled={!isEdit}
      />
    </div>
  );
};
export default MemoBox;
