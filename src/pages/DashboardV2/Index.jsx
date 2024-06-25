import React, { useEffect, useState } from "react";

import FieldCard from "./Component/FieldCard";
import { Button, Form, List, Modal, Tabs } from "antd";
import moment from "moment";
import FormItems from "./Component/FormItems";
import {
  FIELD_BOOKING_STATUS,
  FIELD_STATUS,
  getNextSixDays,
} from "./Component/Comon";
import { toast } from "react-toastify";
import { usePublicApi } from "../../apiHelper/api/PublicApi";

const Index = () => {
  const apiClient = usePublicApi();

  const [listFiled, setField] = useState([]);
  const [dateSelect, setDateSelect] = useState();
  const [listDate, setListDate] = useState([]);

  const [formConfirm] = Form.useForm();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    //lấy danh sách 6 ngày tiếp theo tính từ ngày hiện tại
    const lstDate = getNextSixDays();
    setListDate(lstDate);
    setDateSelect(lstDate[0]?.key);

    //lây danh sách tất cả các sân
    LoadFields();
  }, []);

  const LoadFields = () => {
    apiClient
      .GetFieldsActive()
      .then((data) => {
        if (data) {
          setField(data.filter((x) => x.Status === FIELD_STATUS.active) || []);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const OnChangeDate = (value) => setDateSelect(value);

  const showModalBooking = (timeSlot, field) => {
    const fieldBooking = {
      FieldId: field.FieldId,
      FieldName: field?.FieldName,
      TimeSlotId: timeSlot.TimeSlotId,
      BookingDate: moment(dateSelect).format("YYYY-MM-DD"),
      TimeFrom: timeSlot.TimeFrom, // moment(timeSlot.TimeFrom).format("YYYY-MM-DDTHH:mm"),
      TimeTo: timeSlot.TimeTo, // moment(timeSlot.TimeTo).format("YYYY-MM-DDTHH:mm"),
      TimeSlotText: timeSlot.TimeFormatted,
      Deposit: timeSlot.Price * 0.4,
      FieldPrice: timeSlot.Price,
      Status: FIELD_BOOKING_STATUS.pending,
    };

    formConfirm.setFieldsValue(fieldBooking);

    setModalOpen(true);
  };

  const CloseModal = () => {
    setModalOpen(false);
    formConfirm.resetFields();
  };

  const HandleBooking = (param) => {
    apiClient
      .ConfirmBooking(param)
      .then((data) => {
        if (data?.code > 0) {
          toast.success(
            "Đặt sân thành công, vui lòng chờ cuộc gọi xác nhận từ nhân viên của chúng tôi"
          );
          setTimeout(function () {
            location.reload();
          }, 3000);
          CloseModal();
        } else {
          if (data?.code == -3) {
            toast.error(
              "Khung giờ bạn đặt đã được đặt trước đó, vui lòng thử lại sau"
            );
          } else {
            toast.error("Đặt sân thất bại, vui lòng thử lại sau");
          }
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
            <div className="flex h-48">
              <div className="p-4 bg-[aliceblue]">
                <h2 className="text-2xl font-bold w-full">
                  Có {listFiled?.length} sân bóng cho bạn lựa chọn
                </h2>
                <div className="text-base">
                  Với mức giá hấp dẫn, phương thức thanh toán linh hoạt
                </div>
              </div>
              <div className="">
                <img
                  className="h-full w-full object-cover"
                  src="https://c.pxhere.com/photos/c6/2c/football_clip_football_boots_soccer_duel_opponents_footballers_sport-1085512.jpg!s2"
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-xl overflow-hidden">
            <div className="flex h-48">
              <div className="p-4 bg-[aliceblue]">
                <h2 className="text-2xl font-bold w-full">
                  Đặt sân nhanh tróng
                </h2>
                <div className="text-base">
                  Chúng tôi sẽ duyệt yêu cầu đặt sân của bạn trong ít phút
                </div>
              </div>
              <div className="">
                <img
                  className="h-full w-full object-cover"
                  src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202201/phone_call_recording.jpg?size=690:388"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex justify-center w-full">
        <Tabs
          className=""
          defaultActiveKey={listDate[0]?.key}
          items={listDate}
          onChange={OnChangeDate}
        />
      </div>
      <div className="py-10 bg-[#f6f6f6]">
        <div className="px-10">
          <h1 className="text-3xl font-bold mb-6">Danh sách sân</h1>
          <div className="">
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 1,
              }}
              dataSource={listFiled}
              renderItem={(item) => (
                <List.Item>
                  <FieldCard
                    apiClient={apiClient}
                    item={item}
                    dateSelect={dateSelect}
                    showModalBooking={showModalBooking}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>

      {modalOpen && (
        <Modal
          title={"Xác nhận đặt sân"}
          centered
          width={1226}
          open={modalOpen}
          onCancel={() => CloseModal()}
          footer={[
            <Button
              key="ok"
              htmlType="submit"
              type="outline"
              onClick={() => {
                formConfirm.submit();
                formConfirm
                  .validateFields()
                  .then((values) => {
                    HandleBooking(values);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Xác nhận
            </Button>,
            <Button key="cancel" type="primary" onClick={() => CloseModal()}>
              Đóng
            </Button>,
          ]}
          className="ant-modal-scrollbar"
        >
          <Form
            form={formConfirm}
            // disabled
            // className="className"
            // disabled={action === "detail" ? true : false}
            // className={action === "detail" ? "ant-form-details" : ""}
          >
            <FormItems formInstance={formConfirm} />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Index;
