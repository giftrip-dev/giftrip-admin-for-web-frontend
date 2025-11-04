"use client";

import {
  ADMIN_ACCOUNT_PAGE,
  COUPON_PAGE,
  EXPERIENCE_PRODUCT_PAGE,
  LOGIN_PAGE,
  MAIN_BANNER_PAGE,
  MEMBER_PAGE,
  NOTICE_PAGE,
  ORDER_PRODUCT_PAGE,
  PASSWORD_RESET_PAGE,
  RESERVATION_EXPERIENCE_PAGE,
  REVIEW_EXPERIENCE_PAGE,
  SUB_BANNER_PAGE,
} from "@/constants/path";
import { SERVICE_NAME } from "@/constants/service";
import useGetUserInfo from "@/hooks/auth/use-get-admin-info";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MenuAccordion, { DepthMenu } from "./menu-accordion";
import { usePostLogout } from "@/hooks/auth/use-post-logout";
import { AdminRole } from "../api/dto/auth";

const GlobalNavBar = () => {
  const admin = useGetUserInfo();

  const path = usePathname();
  const router = useRouter();
  const { onSubmit } = usePostLogout();

  // 로그아웃 성공 핸들러
  const handleSuccessLogOut = () => {
    router.replace(LOGIN_PAGE);
  };

  const menuArray = [
    {
      label: "상품 관리",
      icon: "product",
      path: `${EXPERIENCE_PRODUCT_PAGE}?prev=1`,
    },
    {
      label: "예약 관리",
      icon: "reservation",
      path: `${RESERVATION_EXPERIENCE_PAGE}?prev=1`,
    },
    {
      label: "주문 관리",
      icon: "order",
      path: `${ORDER_PRODUCT_PAGE}?prev=1`,
    },
    {
      label: "회원 관리",
      icon: "member",
      path: `${MEMBER_PAGE}?prev=1`,
    },
    {
      label: "배너 관리",
      icon: "banner",
      path: [
        {
          label: "메인 배너",
          path: `${MAIN_BANNER_PAGE}?prev=1`,
        },
        {
          label: "서브 배너",
          path: `${SUB_BANNER_PAGE}?prev=1`,
        },
      ],
    },
    {
      label: "게시판 관리",
      icon: "notice",
      path: `${NOTICE_PAGE}?prev=1`,
    },
    {
      label: "쿠폰 관리",
      icon: "coupon",
      path: `${COUPON_PAGE}?prev=1`,
    },
    {
      label: "리뷰 관리",
      icon: "review",
      path: `${REVIEW_EXPERIENCE_PAGE}?prev=1`,
    },
  ];

  const adminArray = [
    {
      label: "관리자 계정 관리",
      icon: "account",
      path: ADMIN_ACCOUNT_PAGE,
    },
    {
      label: "비밀번호 변경",
      icon: "password",
      path: PASSWORD_RESET_PAGE,
    },
    {
      label: "로그아웃",
      icon: "logout",
      onClick: () => onSubmit(handleSuccessLogOut),
    },
  ];

  // SUPER_ADMIN만 계정 관리 메뉴 표시
  const filteredAdminArray = adminArray.filter((menu) => {
    if (menu.label === "관리자 계정 관리") {
      return admin?.role === AdminRole.SUPER_ADMIN;
    }
    return true;
  });

  return (
    <div className="fixed inset-y-0 left-0 flex w-full max-w-[240px] flex-col gap-3 bg-primary pb-10 pt-5 text-white">
      <div className="relative">
        <Link
          prefetch={false}
          className="relative block px-4 pb-6"
          href={EXPERIENCE_PRODUCT_PAGE}
        >
          <Image
            src="/svg/logo/logo.svg"
            alt={SERVICE_NAME}
            width={91}
            height={24}
          />
        </Link>
        <div className="">
          <div className="h-[75px] px-4 py-6">
            {admin ? (
              <div className="flex justify-between">
                <p>
                  <span className="text-title-1">{admin.name}</span>
                  <span className="text-body-1">님</span>
                </p>
                <p className="rounded-sm bg-white px-2 py-[2px] text-body-3 text-black">
                  {admin.role === AdminRole.ADMIN ? "일반" : "마스터"}
                </p>
              </div>
            ) : (
              <LoaderIcon className={`animate-spin text-white duration-1000`} />
            )}
          </div>
          <div className="max-h-[calc(100vh-141px)] overflow-y-auto hide-scroll-bar">
            <div className="flex h-full min-h-[calc(100vh-141px)] flex-col justify-between gap-10 pb-10">
              <div>
                {menuArray.map((menu) => {
                  if (typeof menu.path === "string") {
                    return (
                      <Link
                        prefetch={false}
                        key={menu.path}
                        className={`flex items-center gap-3 rounded-md px-4 py-6 text-title-2 hover:underline ${path === menu.path ? "bg-[#353434]" : ""}`}
                        href={menu.path}
                      >
                        <Image
                          src={`/svg/gnb/${menu.icon}.svg`}
                          alt={menu.label}
                          width={24}
                          height={24}
                          sizes="size-6"
                          className="-mt-px"
                        />
                        {menu.label}
                      </Link>
                    );
                  } else {
                    return (
                      <MenuAccordion
                        currentPath={path}
                        menu={menu as DepthMenu}
                        key={menu.label}
                      />
                    );
                  }
                })}
              </div>
              <div className="px-1">
                {filteredAdminArray.map((menu) => {
                  if (menu.path) {
                    return (
                      <Link
                        prefetch={false}
                        key={menu.path}
                        className={`flex items-center gap-3 rounded-md px-3 py-4 text-subtitle-2 hover:underline ${path === menu.path ? "bg-[#353434]" : ""}`}
                        href={menu.path}
                      >
                        <Image
                          src={`/svg/gnb/${menu.icon}.svg`}
                          alt={menu.label}
                          width={24}
                          height={24}
                          sizes="size-6"
                          className="-mt-px"
                        />
                        {menu.label}
                      </Link>
                    );
                  } else {
                    return (
                      <button
                        key={menu.label}
                        onClick={menu.onClick}
                        className={`flex items-center gap-3 rounded-md px-3 py-4 text-subtitle-2 hover:underline ${path === menu.path ? "bg-[#353434]" : ""}`}
                      >
                        <Image
                          src={`/svg/gnb/${menu.icon}.svg`}
                          alt={menu.label}
                          width={24}
                          height={24}
                          sizes="size-6"
                          className="-mt-px"
                        />
                        {menu.label}
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GlobalNavBar;
