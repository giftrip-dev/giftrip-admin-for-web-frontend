import { useGetNoticeDetail } from "@/hooks/notice/use-get-notice-detail";
import NoticeInfoBox from "./notice-info-box";

const NoticeDetailContainer = ({ id }: { id: string }) => {
  const { data } = useGetNoticeDetail(id);

  if (!data) return null;

  return (
    <div className="mt-8">
      <NoticeInfoBox notice={data} />
    </div>
  );
};

export default NoticeDetailContainer;
