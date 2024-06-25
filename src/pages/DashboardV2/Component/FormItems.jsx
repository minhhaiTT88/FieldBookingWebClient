import { DatePicker, Form, Input, InputNumber } from "antd";
import { useGlobalConst } from "../../../utils/constData";
import { useSelector } from "react-redux";

const FormItems = ({ formInstance, action, data }) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  return (
    <div className="field-list">
      <Form.Item name={"FieldBookingId"} hidden />
      <Form.Item name={"CustomerId"} hidden />
      <Form.Item name={"FieldId"} hidden />
      <Form.Item name={"TimeSlotId"} hidden />

      <Form.Item name={"TimeFrom"} hidden />
      <Form.Item name={"TimeTo"} hidden />

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
            label="Ngày đặt sân"
            name="BookingDate"
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
          >
            <DatePicker
              placeholder="dd/MM/yyyy"
              format={globalConst.ANT.LOCALE.dateFormat}
              disabled
            />
          </Form.Item>
        </div>
        <div className="flex-1">
          <Form.Item
            label={`Sân`}
            name={"FieldName"}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input disabled />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-nowrap gap-4">
        <div className="flex-1">
          <Form.Item
            label={`Khung giờ`}
            name={"TimeSlotText"}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input disabled />
          </Form.Item>
        </div>
        <div className="flex-1">
          <Form.Item
            label={`Tiền cọc`}
            name={"Deposit"}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <InputNumber
              disabled
              formatter={(value) =>
                `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
      <div className="w-full mt-2">
        <div>
          Chuyển khoảng số tiền cọc của bạn đến số tài khoản bên dưới với nội
          dung ví dụ : "san 1 ngay 25062024 gio 1345 1445 chuyen coc", Hãy chụp
          lại thông báo giao dịch thành công để dễ dàng xử lý sai sót sau về sau
        </div>
        <div className="w-fit m-auto">
          {/*  Company logo  */}
          <img
            className="m-auto"
            src="https://quickchart.io/qr?text=BarcodesInc&size=200"
            alt="company-logo"
            height={200}
            width={200}
          />
          <div className="font-bold">
            <div>Tên tài khoản: SAN BONG THUY LOI</div>
            <div>Ngân hàng: MB</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormItems;
