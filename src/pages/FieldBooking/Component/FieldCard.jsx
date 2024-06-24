import React, { useEffect, useState } from "react";
import bgField from "../../../assets/image/sanbong.png";
import { Button, Card } from "antd";

const FieldCard = ({ item, goBookingRequest, goBookingPayment }) => {
  return (
    <>
      <Card
        cover={<img alt="example" src={bgField} />}
        actions={[
          <Button
            onClick={() => {
              goBookingRequest && goBookingRequest(item);
            }}
          >
            Đơn đặt sân
          </Button>,
          <Button
            onClick={() => {
              goBookingPayment && goBookingPayment(item);
            }}
          >
            Thanh toán sân
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
          <div className="flex flex-nowrap items-center justify-between">
            <span>Số đơn đặt sân chờ duyệt</span>
            {/* <div className="border w-full"></div> */}
            <sapn className="font-bold">4</sapn>
          </div>
          <div className="flex flex-nowrap items-center justify-between">
            <span className="">Số đơn chưa thanh toán</span>
            {/* <div className="border w-full"></div> */}
            <sapn className="font-bold">4</sapn>
          </div>
        </div>
      </Card>
    </>
  );
};
export default FieldCard;
