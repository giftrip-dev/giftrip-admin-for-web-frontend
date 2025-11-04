import { toQueryString } from "@/util/query";
import { apiFetch } from "@/util/fetch";
import {
  ExperienceReservationItem,
  ExperienceReservationListReq,
  ExperienceReservationListRes,
  AccommodationReservationListReq,
  AccommodationReservationListRes,
  AccommodationReservationItem,
  CampaignReservationListReq,
  CampaignReservationListRes,
  CampaignReservationItem,
  MemberReservationListRes,
  AccommodationMatchingStatus,
  ReservationStatus,
} from "./dto/reservation";

// 체험 예약 목록 조회
export const getExperienceReservationList = async (
  req: ExperienceReservationListReq,
): Promise<ExperienceReservationListRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(
      `/reservations/experience${query ? `?${query}` : ""}`,
    );
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("체험 예약 목록 조회에 실패했습니다.");
  }
};

// 체험 예약 상세 조회
export const getExperienceReservationDetail = async (
  id: string,
): Promise<ExperienceReservationItem> => {
  try {
    const res = await apiFetch(`/reservations/experience/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("주문 상세 조회에 실패했습니다.");
  }
};

// 체험단 예약 목록 조회
export const getCampaignReservationList = async (
  req: CampaignReservationListReq,
): Promise<CampaignReservationListRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(
      `/reservations/campaign${query ? `?${query}` : ""}`,
    );
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("체험단 예약 목록 조회에 실패했습니다.");
  }
};

// 체험단 예약 상세 조회
export const getCampaignReservationDetail = async (
  id: string,
): Promise<CampaignReservationItem> => {
  try {
    const res = await apiFetch(`/reservations/campaign/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("체험단 예약 상세 조회에 실패했습니다.");
  }
};

// 숙소 예약 목록 조회
export const getAccommodationReservationList = async (
  req: AccommodationReservationListReq,
): Promise<AccommodationReservationListRes> => {
  const query = toQueryString(req);

  try {
    const res = await apiFetch(
      `/reservations/accommodation${query ? `?${query}` : ""}`,
    );
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("숙소 예약 목록 조회에 실패했습니다.");
  }
};

// 숙소 예약 상세 조회
export const getAccommodationReservationDetail = async (
  id: string,
): Promise<AccommodationReservationItem> => {
  try {
    const res = await apiFetch(`/reservations/accommodation/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("숙소 예약 상세 조회에 실패했습니다.");
  }
};

// 회원별 예약 목록 조회
export const getMemberReservationList = async (
  memberId: string,
  req: ExperienceReservationListReq,
): Promise<MemberReservationListRes> => {
  const query = toQueryString(req);
  try {
    const res = await apiFetch(
      `/reservations/user/${memberId}${query ? `?${query}` : ""}`,
    );
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("회원별 예약 목록 조회에 실패했습니다.");
  }
};

// 숙소 매칭 상태 변경
export const updateAccommodationMatchingStatus = async (
  id: string,
  matchingStatus: AccommodationMatchingStatus,
): Promise<AccommodationReservationItem> => {
  try {
    const res = await apiFetch(
      `/reservations/accommodation/${id}/matching-status`,
      {
        method: "PATCH",
        body: JSON.stringify({ matchingStatus }),
      },
    );
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("숙소 매칭 상태 변경에 실패했습니다.");
  }
};

// 체험 예약 상태 변경
export const updateExperienceReservationStatus = async (
  id: string,
  status: ReservationStatus,
): Promise<ExperienceReservationItem> => {
  try {
    const res = await apiFetch(`/reservations/experience/${id}/status`, {
      method: "POST",
      body: JSON.stringify({ status }),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("체험 예약 상태 변경에 실패했습니다.");
  }
};

// 체험단 예약 상태 변경
export const updateCampaignReservationStatus = async (
  id: string,
  status: ReservationStatus,
): Promise<CampaignReservationItem> => {
  try {
    const res = await apiFetch(`/reservations/campaign/${id}/status`, {
      method: "POST",
      body: JSON.stringify({ status }),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("체험단 예약 상태 변경에 실패했습니다.");
  }
};

// 숙소 예약 상태 변경
export const updateAccommodationReservationStatus = async (
  id: string,
  status: ReservationStatus,
): Promise<AccommodationReservationItem> => {
  try {
    const res = await apiFetch(`/reservations/accommodation/${id}/status`, {
      method: "POST",
      body: JSON.stringify({ status }),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("숙소 예약 상태 변경에 실패했습니다.");
  }
};
