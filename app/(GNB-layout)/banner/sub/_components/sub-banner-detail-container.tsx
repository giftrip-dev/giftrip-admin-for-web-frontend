import { useGetBannerDetail } from "@/hooks/banner/use-get-banner-detail";
import SubBannerInfoBox from "./sub-banner-info-box";

const SubBannerDetailContainer = ({ id }: { id: string }) => {
  const { data } = useGetBannerDetail(id);

  if (!data) return null;

  return (
    <div className="mt-8">
      <SubBannerInfoBox banner={data} />
    </div>
  );
};

export default SubBannerDetailContainer;
