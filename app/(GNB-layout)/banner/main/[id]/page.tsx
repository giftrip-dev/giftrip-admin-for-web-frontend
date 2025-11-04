"use client";

import { useParams, useRouter } from "next/navigation";
import MainBannerCrumble from "../_components/main-banner-crumble";
import Loading from "@/components/shared/loading/loading";
import MainBannerDetailContainer from "../_components/main-banner-detail-container";
import ProductCtaButtonList from "@/app/_components/button/product-cta-button-list";
import { useDeleteBanner } from "@/hooks/banner/use-delete-banner";
import { MAIN_BANNER_EDIT_PAGE, MAIN_BANNER_PAGE } from "@/constants/path";

const MainBannerDetailPage = () => {
  const { id } = useParams();
  const { onSubmit, loading } = useDeleteBanner({ isMain: true });
  const router = useRouter();

  // 수정 버튼 핸들러
  const clickEdit = () => {
    router.push(MAIN_BANNER_EDIT_PAGE.replace("[id]", id as string));
  };

  // 삭제 버튼 핸들러
  const clickDelete = () => {
    onSubmit(id as string);
  };

  // 목록 버튼 핸들러
  const clickBackToList = (prev: string) => {
    router.push(`${MAIN_BANNER_PAGE}?prev=${prev}`);
  };

  return (
    <div className="pt-3">
      <MainBannerCrumble />
      <ProductCtaButtonList
        clickBackToList={clickBackToList}
        clickDelete={clickDelete}
        clickEdit={clickEdit}
        loading={loading}
        modalTitle="배너 삭제"
      />
      <Loading>
        <MainBannerDetailContainer id={id as string} />
      </Loading>
    </div>
  );
};

export default MainBannerDetailPage;
