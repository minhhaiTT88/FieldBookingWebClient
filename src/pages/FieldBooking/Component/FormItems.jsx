import { Form, Input } from "antd";
import { useGlobalConst } from "../../../utils/constData";
import { useSelector } from "react-redux";

const FormItems = ({ formInstance, action, data }) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  return (
    <div className="field-list">
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
      <Form.Item
        label={`Họ và tên`}
        name={"CustomerName"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Input autoComplete="off" />
      </Form.Item>
    </div>
  );
};

export default FormItems;
