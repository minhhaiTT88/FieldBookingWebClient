import moment from "moment";
import { useEffect, useState } from "react";
import { useFieldBookingApi } from "../../../apiHelper/api/FieldBookingApi";
import { formatDate, formatNumberVND } from "../../../utils/convertData";

const TimeSlotByDate = ({ fieldId, date, SelectTimeSlot }) => {
  const fieldBookingApi = useFieldBookingApi();
  const [listTimeSlot, setListTimeSlot] = useState([]);

  useEffect(() => {
    if (fieldId > 0) {
      fieldBookingApi
        .GetTimeSlotByDate(fieldId, date.format("YYYY-MM-DD"))
        .then((data) => {
          if (data) {
            setListTimeSlot(data);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, [date]);

  return (
    <>
      <div className="row">
        {listTimeSlot?.map((e, k) => (
          <div
            key={k}
            className="set-yard"
            onClick={() => {
              SelectTimeSlot && SelectTimeSlot(date, e);
            }}
          >
            <div className="frame-price">
              <span className="price-label text-nowrap">
                {formatDate(e?.TimeFrom, "HH:mm")} -{" "}
                {formatDate(e?.TimeTo, "HH:mm")}
              </span>
              <div className="price-label">
                <b>{e?.Valid === 0 ? "hết" : formatNumberVND(e.Price)}</b>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default TimeSlotByDate;
