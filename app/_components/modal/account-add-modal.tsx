import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePostAccount } from "@/hooks/account/use-post-account";

interface AccountAddModalProps {
  onClickClose: () => void;
}

const AccountAddModal = ({ onClickClose }: AccountAddModalProps) => {
  const { form, onSubmit, loading } = usePostAccount(onClickClose);
  const isValid = form.formState.isValid;

  const accountArray = [
    {
      label: "이름",
      placeholder: "관리자 이름을 입력해주세요",
      name: "name",
    },
    {
      label: "관리자 아이디",
      placeholder: "관리자 아이디를 입력해주세요",
      name: "loginId",
    },
    {
      label: "비밀번호",
      placeholder: "관리자 비밀번호를 입력해주세요",
      name: "password",
    },
  ];

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 px-5">
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="flex w-[367px] flex-col gap-8 rounded-xl bg-white p-4"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-1">
              <p className="text-heading-3">관리자 생성하기</p>
            </div>
            <div className="flex flex-col gap-4">
              {accountArray.map((pw) => (
                <div className="flex flex-col gap-2" key={pw.label}>
                  <p className="text-heading-5">{pw.label}</p>
                  <CustomInputField
                    noSpace
                    form={form}
                    name={pw.name as "loginId" | "name"}
                    placeholder={pw.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant={"outline"} onClick={onClickClose}>
              닫기
            </Button>
            <Button disabled={!isValid} loading={loading}>
              생성하기
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default AccountAddModal;
