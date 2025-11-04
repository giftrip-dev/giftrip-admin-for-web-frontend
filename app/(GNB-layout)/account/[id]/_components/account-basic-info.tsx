import ShortRow from "@/app/_components/table/short-row";
import { AdminAccount } from "@/app/api/dto/account";
import { AdminRole } from "@/app/api/dto/auth";
import { Button } from "@/components/ui/button";
import { LOGIN_PAGE } from "@/constants/path";
import { usePatchAccountPassword } from "@/hooks/account/use-patch-account-password";
import useGetAdminInfo from "@/hooks/auth/use-get-admin-info";
import { useRouter } from "next/navigation";

interface AccountBasicInfoProps {
  data: AdminAccount;
}

const AccountBasicInfo = ({ data }: AccountBasicInfoProps) => {
  const { onSubmit } = usePatchAccountPassword(data.id);
  const admin = useGetAdminInfo();
  const accountRoleText =
    data.role === AdminRole.ADMIN ? "일반 관리자" : "마스터 관리자";
  const router = useRouter();

  // admin 정보가 없을 경우
  if (admin === null) {
    router.replace(LOGIN_PAGE);
    return null;
  }

  // 마스터 관리자 여부
  const isSuperAdmin = admin?.role === AdminRole.SUPER_ADMIN;

  // 비밀번호 초기화 핸들러
  const onClickResetPassword = () => {
    onSubmit();
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="text-heading-4">관리자 정보</p>
      <div>
        <ShortRow size="md" label="이름" value={data.name} />
        <ShortRow size="md" label="아이디" value={data.loginId} />
        <ShortRow size="md" label="관리자 권한" value={accountRoleText} />
        {isSuperAdmin && (
          <ShortRow isLastRow size="md" label="비밀번호" value={""}>
            <Button
              onClick={onClickResetPassword}
              type="button"
              variant={"outline-black"}
              size={"sm"}
            >
              비밀번호 초기화
            </Button>
          </ShortRow>
        )}
      </div>
    </div>
  );
};
export default AccountBasicInfo;
