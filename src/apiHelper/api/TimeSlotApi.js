import md5 from "md5";
import {
  getUserFromStorage,
  get_User_Name,
} from "../../store/actions/sharedActions";
import { useAxios } from "../connection/APIConnection";

export const useTimeSlotApi = (controller) => {
  const apiConnection = useAxios();

  return {
    SearchData: (keysearch, from, to, orderBy) => {
      return apiConnection.httpRequest(
        "POST",
        `api/TimeSlot/search`,
        null,
        {
          keysearch,
          from,
          to,
          orderBy,
        },
        true
      );
    },
    GetById: (value) => {
      return apiConnection.httpRequest(
        "GET",
        `api/TimeSlot/getdetailbyid`,
        null,
        { value },
        true
      );
    },
    GetByFieldId: (value) => {
      return apiConnection.httpRequest(
        "GET",
        `api/TimeSlot/getByFieldId`,
        null,
        { value },
        true
      );
    },
    GetAll: () => {
      return apiConnection.httpRequest(
        "GET",
        `api/TimeSlot/GetAll`,
        null,
        null,
        true
      );
    },
    Insert: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        "api/TimeSlot/insert",
        prop,
        null,
        true
      );
    },
    Update: (prop) => {
      return apiConnection.httpRequest(
        "PUT",
        "api/TimeSlot/update",
        prop,
        null,
        true
      );
    },
    Delete: (value) => {
      return apiConnection.httpRequest(
        "DELETE",
        "api/TimeSlot/delete",
        null,
        {
          value,
        },
        true
      );
    },
  };
};
