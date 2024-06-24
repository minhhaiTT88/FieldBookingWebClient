import React from "react";
import { useSelector } from "react-redux";

import { Form, Input, DatePicker, Button, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

const ItemSearch = React.forwardRef(({ formInstance, onSubmit }, ref) => {
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);
  const navigate = useNavigate();

  return (
    <div className="flex-controls">
      {/* <div className="ant-form-control ant-form-input">
        <label>Tên bài viết</label>
        <Form.Item name={"Name"}>
          <Input />
        </Form.Item>
      </div> */}
      {/* <div className="ant-form-control ant-form-input">
        <label>Loại bài viết</label>
        <Form.Item name={"Is_Private"} mode="single" rules={[]}>
          <Select
            mode="single"
            optionFilterProp="children"
            placeholder="-- Lựa chọn -- "
            allowClear
            showSearch
          >
            {allCode
              ?.filter((e) => e.Cdname === "YZ_POSTS" && e.Cdtype === "IS_PRIVATE")
              .map((item, key) => (
                <Select.Option key={key} value={+item.Cdval}>
                  {item.Content}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div> */}
      <div className="ant-form-control ant-form-input">
        <label>Trạng thái</label>
        <Form.Item name={"Status"} mode="single" rules={[]}>
          <Select
            mode="single"
            optionFilterProp="children"
            placeholder="-- Lựa chọn -- "
            allowClear
            showSearch
          >
            {allCode
              ?.filter((e) => e.Cdname === "YZ_POSTS" && e.Cdtype === "STATUS")
              .map((item, key) => (
                <Select.Option key={key} value={+item.Cdval}>
                  {item.Content}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
      <div className="ant-form-control ant-form-input">
        <label>Khung giờ</label>
        <Form.Item name={"Status"} mode="single" rules={[]}>
          <Select
            mode="single"
            optionFilterProp="children"
            placeholder="-- Lựa chọn -- "
            allowClear
            showSearch
          >
            {allCode
              ?.filter((e) => e.Cdname === "YZ_POSTS" && e.Cdtype === "STATUS")
              .map((item, key) => (
                <Select.Option key={key} value={+item.Cdval}>
                  {item.Content}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
      
      <div className="ant-form-control ant-form-item-date w-fit">
        <label>Ngày đăng</label>
        <Form.Item name={"Created_RANGE"}>
          <RangePicker format={"DD/MM/YYYY"} placeholder={["Từ ngày", "Đến ngày"]} />
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
      <div className="ant-form-control">
        <Button
          type="primary"
          className="light-orange"
          onClick={() => {
            navigate("/quan-ly-bai-viet/bai-viet");
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Thêm mới</span>
        </Button>
      </div>
    </div>
  );
});

export default ItemSearch;
