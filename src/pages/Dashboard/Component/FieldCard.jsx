import React, { useEffect, useState } from "react";
import bgField from "../../../assets/image/snbong.webp";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useTimeSlotApi } from "../../../apiHelper/api/TimeSlotApi";

const FieldCard = ({ item }) => {
  console.log(item);
  const navigate = useNavigate();
  const apiTimeSlot = useTimeSlotApi();

  const [listTimeSlot, setListTimeSlot] = useState([]);

  useEffect(() => {
    if (item?.FieldId > 0) {
      apiTimeSlot
        .GetByFieldId(item.FieldId)
        .then((data) => {
          if (data) {
            console.log(data);
            setListTimeSlot(data);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, [item]);

  const goBooking = () => {
    navigate("/dat-san?id=" + item.FieldId);
  };
  return (
    <>
      <Card
        className="shadow-black"
        cover={<img alt="example" src={bgField} />}
        actions={[
          <Button
            className="w-[90%] bg-[#142239]"
            type="primary"
            onClick={() => {
              goBooking();
            }}
          >
            Đặt sân ngay
          </Button>,
        ]}
      >
        <div className="p-2">
          <h3 className="text-xl font-bold">{item?.FieldName}</h3>
          <div className="flex flex-nowrap items-center justify-between">
            <span>Trạng thái</span>
            {/* <div className="border w-full"></div> */}
            <sapn className="font-bold">Hoạt động</sapn>
          </div>
          <div className="mt-2">
            <span>Khung giờ</span>

            <div className="font-semibold flex gap-2 mt-1 overflow-hidden">
              {listTimeSlot?.map((e, k) => (
                <div className="rounded-xl bg-[antiquewhite] w-fit p-1 text-nowrap">
                  13h20-13h40
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
export default FieldCard;
