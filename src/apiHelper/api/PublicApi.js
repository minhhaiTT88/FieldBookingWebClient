import { useAxios } from "../connection/APIConnection";

export const usePublicApi = () => {
  const apiConnection = useAxios();

  return {
    GetFieldsActive: () => {
      return apiConnection.httpRequest(
        "GET",
        `api/PublicApi/GetFieldsActive`,
        null,
        null,
        true
      );
    },
    ConfirmBooking: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        "api/PublicApi/ConfirmBooking",
        prop,
        null,
        true
      );
    },
    GetTimeSlotByDate: (fieldId, bookingDate) => {
      return apiConnection.httpRequest(
        "GET",
        `api/PublicApi/GetTimeSlotByDate`,
        null,
        { fieldId, bookingDate },
        true
      );
    },
  };
};
