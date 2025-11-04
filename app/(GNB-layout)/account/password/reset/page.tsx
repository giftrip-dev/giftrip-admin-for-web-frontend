"use client";
import PasswordChangeModal from "@/app/_components/modal/password-change-modal";
import { EXPERIENCE_PRODUCT_PAGE } from "@/constants/path";
import { useRouter } from "next/navigation";

const PasswordResetPage = () => {
  const router = useRouter();

  // 다음에 하기 버튼 핸들러
  const onClickClose = () => {
    router.push(EXPERIENCE_PRODUCT_PAGE);
  };
  return (
    <div>
      <PasswordChangeModal onClickClose={onClickClose} />
    </div>
  );
};
export default PasswordResetPage;
