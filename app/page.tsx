"use client";

import { LoadIcon } from "@/components/shared/loading/loading";
import { LOGIN_PAGE, EXPERIENCE_PRODUCT_PAGE } from "@/constants/path";
import useGetUserInfo from "@/hooks/auth/use-get-admin-info";
import { useRouter } from "next/navigation";

const Home = () => {
  const admin = useGetUserInfo();
  const router = useRouter();

  // 로딩 중일 경우
  if (admin === undefined) {
    return <LoadIcon />;
  }

  // 로그인 하지 않은 경우
  else if (admin === null) {
    return router.replace(LOGIN_PAGE);
  }

  return router.replace(`${EXPERIENCE_PRODUCT_PAGE}?prev=1`);
};
export default Home;
