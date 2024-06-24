import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Form, Modal } from "antd";
import { useFieldApi } from "../../apiHelper/api/FieldApi";
import bgField from "../../assets/image/snbong.webp";
import { useSearchParams } from "react-router-dom";
import TimeSlot from "./Component/TimeSlot";

import FormItems from "./Component/FormItems";
import FormConfirmBooking from "../FieldBookingList/Component/FormConfirmBooking";
import { useFieldBookingApi } from "../../apiHelper/api/FieldBookingApi";
import moment from "moment";
import { FIELD_STATUS } from "./Component/Comon";

const Index = () => {
  const [searchParams] = useSearchParams();

  const [fieldId, setFieldId] = useState(0);
  const [field, setField] = useState();

  const apiField = useFieldApi();
  const apiFieldBooking = useFieldBookingApi();

  const [formClient] = Form.useForm();

  const [formConfirm] = Form.useForm();

  const [modalOpen, setModalOpen] = useState(false);

  const SelectTimeSlot = (date, timeSlot) => {
    formClient.submit();
    formClient
      .validateFields()
      .then((values) => {
        const fieldBooking = {
          FieldId: fieldId,
          FieldName: field?.FieldName,
          TimeSlotId: timeSlot.TimeSlotId,
          CustomerName: values.CustomerName,
          PhoneNumber: values.PhoneNumber,
          BookingDate: moment(date).format("YYYY-MM-DD"),
          TimeFrom: timeSlot.TimeFrom, // moment(timeSlot.TimeFrom).format("YYYY-MM-DDTHH:mm"),
          TimeTo: timeSlot.TimeTo, // moment(timeSlot.TimeTo).format("YYYY-MM-DDTHH:mm"),
          TimeSlotText:
            moment(timeSlot.TimeFrom).format("YYYY-MM-DDTHH:mm") +
            " - " +
            moment(timeSlot.TimeTo).format("YYYY-MM-DDTHH:mm"),
          Deposit: timeSlot.Price * 0.4,
          FieldPrice: timeSlot.Price,
          Status: FIELD_STATUS.pending,
        };
        console.log(fieldBooking);
        formConfirm.setFieldsValue(fieldBooking);

        setModalOpen(true);
      })
      .catch((e) => {
        console.log("Bạn cần phải điền thông tin cá nhân");
      });
  };

  const CloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    var _id = parseInt(searchParams.get("id") ?? "-1");
    setFieldId(_id);
    LoadField(_id);
  }, [searchParams]);

  const LoadField = (id) => {
    apiField
      .GetById(id)
      .then((data) => {
        if (data) {
          console.log(data);
          setField(data);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const HandleBooking = (param) => {
    apiFieldBooking
      .Insert(param)
      .then((data) => {
        if (data?.code > 0) {
          LoadField(fieldId);
          toast.success(data.message);
          // Search();
          CloseModal();
        } else {
          toast.error(data.message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <div className="bg-[#f6f6f6]">
        <div className="p-10">
          <Card
            className="shadow-black"
            cover={<img alt="example" className="h-48" src={bgField} />}
          >
            <div className="p-2">
              <h3 className="text-xl font-bold">{field?.FieldName}</h3>
              <div className="flex flex-nowrap items-center justify-between">
                <span>Trạng thái</span>
                {/* <div className="border w-full"></div> */}
                <sapn className="font-bold">Hoạt động</sapn>
              </div>
              <div className="mt-2">
                <span>Khung giờ</span>

                <div className="font-semibold flex gap-2 mt-1 overflow-hidden">
                  <div className="rounded-xl bg-[antiquewhite] w-fit p-1 text-nowrap">
                    13h20-13h40
                  </div>
                  <div className="rounded-xl bg-[antiquewhite] w-fit p-1 text-nowrap">
                    13h20-13h40
                  </div>
                  <div className="rounded-xl bg-[antiquewhite] w-fit p-1 text-nowrap">
                    13h20-13h40
                  </div>
                  <div className="rounded-xl bg-[antiquewhite] w-fit p-1 text-nowrap">
                    13h20-13h40
                  </div>
                  <div className="rounded-xl bg-[antiquewhite] w-fit p-1 text-nowrap">
                    13h20-13h40
                  </div>
                  <div className="rounded-xl bg-[antiquewhite] w-fit p-1 text-nowrap">
                    13h20-13h40
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <div className="rounded-xl mt-10 bg-white p-5">
            <Form className="form-search pb-4" form={formClient}>
              <FormItems />
            </Form>
          </div>
          <div className="rounded-xl mt-10 bg-white p-5">
            <div className="py-3 px-2 bg-[aliceblue] rounded-xl border text-center text-base">
              Lịch thuê sân 6 ngày sắp tới
            </div>
            <div>
              Chọn một khung giờ bạn muốn để tiến hành hoàn thiện đặt sân
            </div>
            <div className="py-2">
              <TimeSlot fieldId={fieldId} SelectTimeSlot={SelectTimeSlot} />
            </div>
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
            disabled
            className="className"
            // disabled={action === "detail" ? true : false}
            // className={action === "detail" ? "ant-form-details" : ""}
          >
            <FormConfirmBooking formInstance={formConfirm} />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Index;
