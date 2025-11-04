import Image from "next/image";
import Link from "next/link";
const PolicyPage = () => {
  return (
    <div className="relative inset-0 z-50 min-h-screen">
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center bg-[#F8F9FF] py-10">
        <Image src="/png/logo.png" alt="기프트립" width="160" height="120" />
      </div>
      <div className="mx-auto mt-[120px] flex max-w-[800px] flex-col items-center justify-center gap-5 py-10">
        <div className="flex gap-5 text-body-1">
          <Link href="/policy/service-terms">서비스 이용약관</Link>
          <Link href="/policy/privacy">개인정보 처리방침</Link>
          <Link href="/policy/refund">서비스 환불 정책</Link>
          {/* <Link href="/policy/child-safety-policy">아동 안전 표준 정책</Link> */}
        </div>
        {/* <Image src="" alt="기프트립" width="800" height="320" />
        <Image src="" alt="기프트립" width="800" height="120" />
        <Image src="" alt="기프트립" width="400" height="120" /> */}
      </div>
      <div
        className="absolute inset-x-0 bottom-0 z-50 h-[329px] bg-[#F8F9FF] px-32 py-10"
        style={{ marginBottom: "-329px" }}
      >
        <div className="flex flex-col font-sans">
          <p className="font-bold">주식회사 피치</p>
          <div className="flex gap-10">
            <p>대표자 | 강선구</p>
            <p>개인정보책임관리자 | 이용정</p>
          </div>
          <p>이메일 | danjae@peachcorp.co.kr</p>
          <p>연락처 | 010-8294-8911</p>
          <p>주소 | 서울특별시 강남구 도산대로 121 10층 1001호</p>
          <div className="flex gap-10">
            <p>사업자등록번호 | 845-86-02138</p>
            <p>관광사업등록번호 | 제 2023-000003 호</p>
          </div>

          <p>통신판매업신고 | 제 2021-전주완산-0729호</p>
          <p>주소 | 전라북도 전주시 완산구 전라감영로 72, 2층 에이 2호(전동)</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
