import React, { useEffect, useState } from "react";

import FieldCard from "./Component/FieldCard";
import { List } from "antd";
import { useFieldApi } from "../../apiHelper/api/FieldApi";

const Index = () => {
  const apiField = useFieldApi();

  const [listFiled, setField] = useState([]);

  useEffect(() => {
    LoadFields();
  }, []);

  const LoadFields = () => {
    apiField
      .GetAll()
      .then((data) => {
        if (data) {
          setField(data);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <div className="p-10">
        <div className="tow-col-responesive">
          <div className="w-full bg-white rounded-xl  overflow-hidden">
            <div className="grid grid-cols-2 h-48">
              <div className="p-4 bg-[aliceblue]">
                <h2 className="text-2xl font-bold w-full">
                  Có {listFiled?.length} sân bóng cho bạn lựa chọn
                </h2>
                <div className="text-base">
                  Với mức giá hấp dẫn, phương thức thanh toán linh hoạt
                </div>
              </div>

              <img
                className="h-full"
                src="https://c.pxhere.com/photos/c6/2c/football_clip_football_boots_soccer_duel_opponents_footballers_sport-1085512.jpg!s2"
              />
            </div>
          </div>
          <div className="w-full bg-white rounded-xl  overflow-hidden">
            <div className="grid grid-cols-2 h-48">
              <div className="p-4 bg-[aliceblue]">
                <h2 className="text-2xl font-bold w-full">
                  Đặt sân nhanh tróng
                </h2>
                <div className="text-base">
                  Chúng tôi sẽ duyệt yêu cầu đặt sân của bạn trong ít phút
                </div>
              </div>

              <img
                className="h-full"
                src="https://c.pxhere.com/photos/c6/2c/football_clip_football_boots_soccer_duel_opponents_footballers_sport-1085512.jpg!s2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 bg-[#f6f6f6]">
        <div className="px-10">
          <h1 className="text-3xl font-bold mb-6">Danh sách sân</h1>
          <div className="">
            <List
              // pagination={{ pageSize: 10, align: "center" }}
              grid={{
                gutter: 16,
                xs: 2,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 6,
              }}
              dataSource={listFiled}
              renderItem={(item) => (
                <List.Item>
                  <FieldCard item={item} />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
