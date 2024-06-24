import { faFolder, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/image/logotrang.png";
import { RoutersConfig } from "../../routes/RoutesConfig";
const LeftMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const getListItemMenu = () => {
    const currentUrl = location.pathname.split("/")[1];
    const _lstItems =
      RoutersConfig?.filter((x) => x.DisplayOnMenu === 1)?.map((item, k) => {
        const funtionUrlActive = item.Function_Url.split("/")[1];
        return {
          ...item,
          key: item.Function_Id,
          label: item.Function_Name,
          className: currentUrl === funtionUrlActive ? "ant-menu-item-selected" : "",
          onClick: () => {
            navigate(item.Function_Url);
          },
        };
      }) || [];
    return _lstItems;
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="demo-logo-vertical p-5">
        <a className="" href="/">
          <img src={logo} />
        </a>
      </div>
      <Menu
        theme="dark"
        // defaultSelectedKeys={["POSTMANA"]}
        mode="inline"
        items={getListItemMenu()}
      />
    </Sider>
  );
};

export default LeftMenu;
