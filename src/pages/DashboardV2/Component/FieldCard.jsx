import React, { useEffect, useState } from "react";
import bgField from "../../../assets/image/snbong.webp";
import { Button, Card } from "antd";

const FieldCard = ({ apiClient, item, dateSelect, showModalBooking }) => {
  const [listTimeSlot, setListTimeSlot] = useState([]);

  useEffect(() => {
    if (item?.FieldId > 0) {
      apiClient
        .GetTimeSlotByDate(item.FieldId, dateSelect)
        .then((data) => {
          if (data) {
            setListTimeSlot(data);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, [dateSelect]);

  return (
    <>
      <div className="flex flex-nowrap">
        <Card
          className=""
          cover={<img alt="example" className="h-[200px]" src={bgField} />}
        >
          <div className="p-2">
            <h3 className="text-xl font-bold">{item?.FieldName}</h3>
            <div className="flex flex-nowrap items-center justify-between">
              <span>Trạng thái</span>
              <sapn className="font-bold">Hoạt động</sapn>
            </div>
          </div>
        </Card>
        <div className="ml-5">
          <div className="text-base font-bold">Khung giờ</div>
          <div className="font-semibold flex flex-wrap gap-2 mt-1 overflow-hidden">
            {listTimeSlot?.map((e, k) => (
              <Button
                disabled={e.Valid === 0 || !e.Enable}
                className="w-fit h-12 p-4 text-nowrap"
                onClick={() => showModalBooking(e, item)}
              >
                {e.TimeFormatted}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default FieldCard;
