import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TwoButtonBar from "../button/two-button-bar";

interface TwoButtonModalProps {
  title: string; // 모달 타이틀
  desc?: string; // 모달 설명
  loading?: boolean; // 버튼 로딩 상태
  buttonText: string; // 버튼 텍스트
  onClickFirstBtn: () => void; // 버튼 핸들러
  onClickSecondBtn: () => void; // 버튼 핸들러
  open: boolean; // 모달 열림 여부
  children?: React.ReactNode; // 모달 내용
}

const TwoButtonModal = ({
  title,
  desc,
  loading,
  buttonText,
  onClickFirstBtn,
  onClickSecondBtn,
  open,
  children,
}: TwoButtonModalProps) => {
  // body overflow 설정 - open 상태에 따라 조건부 실행
  useEffect(() => {
    if (open) {
      // 모달이 열리면 body 스크롤을 막음
      document.body.style.overflow = "hidden";

      // 모달이 닫히면 body 스크롤을 다시 허용
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [open]);

  // Portal mount 여부 체크
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden bg-black/70">
      <div className="w-full max-w-[380px] rounded-[20px] bg-white px-6 py-8">
        <div className="flex flex-col items-center gap-6">
          {children ?? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-heading-3">{title}</p>
              {desc && <p className="text-body-1">{desc}</p>}
            </div>
          )}
          <TwoButtonBar
            loading={loading}
            firstBtnTxt="취소"
            secondBtnTxt={buttonText}
            onClickFirstBtn={onClickFirstBtn}
            onClickSecondBtn={onClickSecondBtn}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};
export default TwoButtonModal;
