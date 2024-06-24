import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useGlobalConst } from "../../../utils/constData";
import { useSelector } from "react-redux";

const FormConfirmBooking = ({ formInstance, action, data }) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  return (
    <div className="field-list">
      <Form.Item name={"FieldBookingId"} hidden />
      <Form.Item name={"CustomerId"} hidden />
      <Form.Item name={"FieldId"} hidden />

      <Form.Item name={"TimeFrom"} hidden />
      <Form.Item name={"TimeTo"} hidden />

      {/* <div className="flex flex-nowrap">
        <div className="flex-1">
          <Form.Item label={`Mã đơn`} name={"Code"}>
            <Input disabled />
          </Form.Item>
        </div>
      </div> */}
      <div className="flex flex-nowrap gap-4">
        <div className="flex-1">
          <Form.Item
            label={`Số điện thoại`}
            name={"PhoneNumber"}
            rules={[
              globalConst.ANT.FORM.RULES.yeuCauNhap,
              globalConst.ANT.FORM.RULES.soDienThoai,
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </div>
        <div className="flex-1">
          <Form.Item
            label={`Tên khách hàng`}
            name={"CustomerName"}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </div>
      </div>

      <div className="flex flex-nowrap gap-4">
        <div className="flex-1">
          <Form.Item
            label={`Ngày đặt sân`}
            name={"BookingDate"}
            {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <DatePicker
              format={globalConst.ANT.LOCALE.dateFormat}
              placeholder="dd/MM/yyyy"
            />
          </Form.Item>
        </div>
        <div className="flex-1">
          <Form.Item label={`Sân`} name={"FieldName"}>
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-nowrap gap-4">
        <div className="flex-1">
          <Form.Item label={`Khung giờ`} name={"TimeSlotText"}>
            <Input />
          </Form.Item>
        </div>
        <div className="flex-1">
          <Form.Item
            label={`Tiền cọc`}
            name={"Deposit"}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <InputNumber
              formatter={(value) =>
                `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "")?.replace("đ", "")
              }
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-nowrap gap-4">
        <div className="flex-1">
          <Form.Item
            label={`Tổng tiền`}
            name={"FieldPrice"}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <InputNumber
              formatter={(value) =>
                `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "")?.replace("đ", "")
              }
              disabled
            />
          </Form.Item>
        </div>
        <div className="flex-1"></div>
      </div>

      {action !== "create" && (
        <>
          <Form.Item label={`Trạng thái`} name={"Status"} rules={[]}>
            <Select
              allowClear
              mode="single"
              showSearch
              optionFilterProp="children"
              disabled
            >
              {allCode
                ?.filter(
                  (e) => e.Cdname === "FIELD_BOOKING" && e.Cdtype === "STATUS"
                )
                .map((item, key) => (
                  <Option key={key} value={item.Cdval}>
                    {item.Content}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </>
      )}
    </div>
  );
};

export default FormConfirmBooking;
