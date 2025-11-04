import React from "react";

const RefundPolicyPage = () => {
  return (
    <div className="container mx-auto max-w-4xl p-10">
      <h1 className="mb-8 text-center text-4xl font-bold text-[#1a1a1a]">
        기프트립 서비스 환불 정책 안내
      </h1>

      {/* 적용 대상 */}
      <section className="mb-12 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 flex items-center text-2xl font-semibold ">
          <span className="mr-2 font-bold">📦</span>
          적용 대상 상품
        </h2>
        <ul className="grid grid-cols-2 gap-4">
          {["체험 상품", "체험단 상품", "숙소 상품", "일반 상품"].map(
            (item) => (
              <li
                key={item}
                className="flex items-center rounded-md bg-blue-50 p-3"
              >
                <span className="mr-2">•</span>
                {item}
              </li>
            ),
          )}
        </ul>
      </section>

      {/* 환불 규정 */}
      <section className="mb-12 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 flex items-center text-2xl font-semibold ">
          <span className="mr-2">📋</span>
          환불 규정
        </h2>
        <ul className="space-y-4">
          {[
            "최소 티켓 구매 수량은 2매이며, 1매 구매 시 자동 취소됩니다.",
            "주문 폭주, 재고 부족 등 업체 사정에 따라 주문이 제한될 수 있습니다.",
            "상품 이미지는 연출된 이미지로 실제와 다를 수 있습니다.",
            "티켓은 현금 교환 및 재판매가 금지됩니다.",
            "티켓은 고유번호가 기재된 이미지 형태로 카카오톡 발송됩니다. *채널 친구 추가 필수*",
            "옵션 상품(숙소·음식·체험 등) 이용 시 기프트립 및 투어패스권 제시가 필요합니다.",
            "운영 시간, 브레이크 타임 및 휴무 일정은 사전 고지 없이 변경될 수 있습니다. 방문 전 업체에 반드시 확인해주세요.",
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start rounded-md bg-gray-50 p-4"
            >
              <span className="mr-2">•</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* 환불 가능 시점 */}
      <section className="mb-12 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 flex items-center text-2xl font-semibold ">
          <span className="mr-2">⏰</span>
          환불 가능 시점
        </h2>
        <div className="space-y-4">
          <div className="rounded-md bg-green-50 p-4">
            <p className="flex items-center">
              <span className="mr-2">✓</span>
              예약일 4일 전 오전 11시까지 (공휴일 제외):{" "}
              <strong>100% 환불</strong>
            </p>
          </div>
          <div className="rounded-md bg-red-50 p-4">
            <p className="flex items-center">
              <span className="mr-2">✕</span>
              예약일 4일 전 오전 11시 이후 (공휴일 제외):{" "}
              <strong>0% 환불</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 추가 유의사항 */}
      <div className="rounded-lg bg-gray-50 p-6 text-sm text-gray-600">
        <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-700">
          <span className="mr-2">ℹ️</span>
          추가 유의사항
        </h2>
        <div className="space-y-3">
          <p className="flex items-start">
            <span className="mr-2">•</span>
            취소 가능 시점 이후 요청 건은 환불이 불가합니다. (상품 미소지로 인한
            오구매, 개인 사정 등 모든 사유 포함)
          </p>
          <p className="flex items-start">
            <span className="mr-2">•</span>
            패키지 상품은 제공 항목 변경, 미사용 및 기상 악화로 인한 부분 환불이
            불가능합니다.
          </p>
          <p className="flex items-start">
            <span className="mr-2">•</span>
            상세페이지 미숙지로 인해 발생한 문제에 대해서는 기프트립 및 업체에서
            책임지지 않습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
