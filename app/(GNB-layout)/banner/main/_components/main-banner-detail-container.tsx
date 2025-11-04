import { useGetBannerDetail } from "@/hooks/banner/use-get-banner-detail";
import MainBannerInfoBox from "./main-banner-info-box";

const MainBannerDetailContainer = ({ id }: { id: string }) => {
  const { data } = useGetBannerDetail(id);

  if (!data) return null;

  return (
    <div className="mt-8">
      <MainBannerInfoBox banner={data} />
    </div>
  );
};

export default MainBannerDetailContainer;
