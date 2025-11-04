import {
  AccommodationMatchingStatus,
  ReservationStatus,
} from "@/app/api/dto/reservation";

export function getChipColor(
  status: ReservationStatus | AccommodationMatchingStatus,
): "green" | "blue" | "red" | "success" {
  switch (status) {
    case ReservationStatus.PAID:
      return "green";
    case AccommodationMatchingStatus.PENDING:
      return "green";
    case ReservationStatus.CANCELLED:
      return "red";
    case ReservationStatus.CONFIRMED:
      return "blue";
    case ReservationStatus.COMPLETED:
      return "success";
    case ReservationStatus.EXPIRED:
      return "red";
    default:
      return "blue";
  }
}
