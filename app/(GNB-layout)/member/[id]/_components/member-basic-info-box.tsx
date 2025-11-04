import ShortRow from "@/app/_components/table/short-row";
import { MemberDetailItem } from "@/app/api/dto/member";
import formattedDate from "@/util/date";
import PointCtaButton from "./point-cta-button";
import { commaWithUnit } from "@/util/price";
import CouponCtaButton from "./coupon-cta-button";
import { convertPlatformToKorean } from "@/util/string";

const MemberBasicInfoBox = ({ data }: { data: MemberDetailItem }) => {
  const { userInfo } = data;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">회원 기본 정보</p>
      <div>
        <ShortRow
          size="sm"
          label="이름"
          value={
            userInfo.isWithdrawn ? "탈퇴한 회원입니다" : userInfo.name || "-"
          }
        />
        <ShortRow
          size="sm"
          label="닉네임"
          value={userInfo.isWithdrawn ? "-" : userInfo.nickname || "-"}
        />
        <ShortRow size="sm" label="이메일" value={userInfo.email || "-"}>
          <div className="flex items-center gap-3">
            <p>{userInfo.email || "-"}</p>
            {userInfo.email && (
              <span className="rounded-[50px] border border-[#EEEFF1] bg-white px-3 py-1 text-title-4">
                {userInfo.oauthProvider === "google"
                  ? "구글"
                  : userInfo.oauthProvider === "apple"
                    ? "애플"
                    : "일반"}
              </span>
            )}
          </div>
        </ShortRow>
        <ShortRow
          size="sm"
          label="연락처"
          value={userInfo.phoneNumber || "-"}
        />
        <ShortRow
          size="sm"
          label="가입일"
          value={formattedDate(userInfo.createdAt, "YYYY-MM-DD HH:mm:ss")}
        />
        <ShortRow
          size="sm"
          label="회원 유형"
          value={userInfo.isInfluencer ? "인플루언서" : "일반"}
        />
        {userInfo.isInfluencer && (
          <>
            <ShortRow
              size="sm"
              label="플랫폼"
              value={
                userInfo.influencerInfo?.platform === "others"
                  ? userInfo.influencerInfo?.platformName || "-"
                  : convertPlatformToKorean(
                      userInfo.influencerInfo?.platform || "",
                    ) || "-"
              }
            />
            <ShortRow
              size="sm"
              label="채널 이름"
              value={userInfo.influencerInfo?.platformId || "-"}
            />
          </>
        )}
        <ShortRow size="sm" label="포인트" value={""}>
          <div className="flex items-center gap-3">
            <p>{commaWithUnit(data.pointBalance, "P")}</p>
            {!userInfo.isWithdrawn && <PointCtaButton userId={userInfo.id} />}
          </div>
        </ShortRow>
        <ShortRow isLastRow size="sm" label="쿠폰" value={""}>
          <div className="flex items-center gap-3">
            <p>{commaWithUnit(data.couponCount, "장")}</p>
            {!userInfo.isWithdrawn && <CouponCtaButton userId={userInfo.id} />}
          </div>
        </ShortRow>
      </div>
    </div>
  );
};

export default MemberBasicInfoBox;
