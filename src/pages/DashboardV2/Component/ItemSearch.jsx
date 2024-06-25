import React from "react";

import { Form, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ItemSearch = React.forwardRef(({ formInstance, onSubmit }, ref) => {
  const [lstField, setLstField] = useState([]);
  const apiClient = useFieldApi();
  const LoadFields = () => {
    apiClient.GetAll().then((data) => {
      console.log(data);
    });
  };
  useEffect(() => {
    LoadFields();
    formInstance.setFieldValue("Status", "P");
  }, []);
  return (
    <div className="flex items-end justify-between">
      <div className="flex-controls w-full">
        <div className="ant-form-control ant-form-input">
          <label>Tên sản phẩm</label>
          <Form.Item name={"Name"}>
            <Input />
          </Form.Item>
        </div>

        <div className="ant-form-control">
          <Button
            onClick={() => {
              onSubmit();
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  );
});

export default ItemSearch;
