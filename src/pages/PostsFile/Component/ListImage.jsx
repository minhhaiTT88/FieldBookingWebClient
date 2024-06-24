import React from "react";

import { Carousel } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import ImagePreview from "./ImagePreview";
const data = Array.from({
  length: 23,
}).map((_, i) => ({
  // href: "https://ant.design",
  // title: `ant design part ${i}`,
  // avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  // description:
  //   "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content: <ImagePreview  />,
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
export const ListImage = () => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
        xxl: 6,
      }}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      dataSource={data}
      renderItem={(item) => <List.Item>{item.content}</List.Item>}
    />
  );
};
