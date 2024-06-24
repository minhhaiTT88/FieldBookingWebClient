import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useGlobalConst } from "../../../utils/constData";
import { useSelector } from "react-redux";

const FormItems = ({ formInstance, action, data }) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  return (
    <div className="field-list">
      <Form.Item name={"ProductId"} hidden>
        <Input autoComplete="off" hidden />
      </Form.Item>
      <Form.Item
        label={`Tên sản phẩm`}
        name={"ProductName"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label={`Giá`}
        name={"Price"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap, globalConst.ANT.FORM.RULES.soLonHonKhong]}
      >
        <InputNumber autoComplete="off" />
      </Form.Item>

      <Form.Item
        label={`Số lượng`}
        name={"Count"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap, globalConst.ANT.FORM.RULES.soLonHonKhong]}
      >
        <InputNumber autoComplete="off" />
      </Form.Item>

      <Form.Item
        label={`Trạng thái`}
        name={"Status"}
        {...globalConst.ANT.FORM.ITEM.SELECT.FORMAT_SELECT}
        rules={[]}
      >
        <Select allowClear mode="single" showSearch optionFilterProp="children">
          {allCode
            ?.filter((e) => e.Cdname === "PRODUCT" && e.Cdtype === "STATUS")
            .map((item, key) => (
              <Option key={key} value={item.Cdval}>
                {item.Content}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item label={`Mô tả`} name={"Description"} rules={[]}>
        <Input autoComplete="off" />
      </Form.Item>
    </div>
  );
};

export default FormItems;
