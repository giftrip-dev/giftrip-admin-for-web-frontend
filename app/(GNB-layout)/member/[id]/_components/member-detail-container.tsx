import { LoadIcon } from "@/components/shared/loading/loading";
import { useGetMemberDetail } from "@/hooks/member/use-get-member-detail";
import MemberDetailHeader from "./member-detail-header";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { MEMBER_PAGE } from "@/constants/path";
import MemberInfoSummaryBox from "./member-info-summary-box";
import MemberBasicInfoBox from "./member-basic-info-box";
import MemberDetailTabs from "./member-detail-tabs";

const MemberDetailContainer = ({ id }: { id: string }) => {
  const { data } = useGetMemberDetail(id);
  const prev = useSearchParams().get("prev") ?? 1;
  const router = useRouter();

  if (!data) return <LoadIcon />;

  const backToList = () => {
    router.push(`${MEMBER_PAGE}?prev=${prev}`);
  };

  return (
    <>
      <MemberDetailHeader>
        <div className="sticky right-0 top-0 flex gap-2">
          <Button variant="label" size={"lg"} onClick={backToList}>
            목록으로
          </Button>
        </div>
      </MemberDetailHeader>
      <MemberInfoSummaryBox data={data} />
      <div className="flex flex-col gap-10 p-10">
        <MemberBasicInfoBox data={data} />
      </div>
      <MemberDetailTabs memberId={id} />
    </>
  );
};

export default MemberDetailContainer;
