import React, { useEffect, useState } from "react";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Image, Space, Tooltip } from "antd";
import { formatDate } from "../../../utils/convertData";
import { handleDownloadFile, handleDownloadFileV2 } from "../../../utils/commonFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faDownload } from "@fortawesome/free-solid-svg-icons";
import { usePublicApi } from "../../../apiHelper/api/PublicApi";
import axios from "axios";

const ImagePreview = ({ image, onClick }) => {
  const apiPublic = usePublicApi();

  const handleClick = (e) => {
    onClick && onClick(e, image);
  };

  return (
    <>
      <div
        className="rounded-2xl bg-white hover:bg-[#e2e5e9] overflow-hidden"
        onClick={handleClick}
      >
        <div className="h-[170px] w-full">
          <img
            className="w-full h-full custom-full-width"
            src={
              "https://tapdoandaiviet.com.vn/manage/responsive_filemanager/source/nuoc-khoang-la-gi-4.jpg"
            }
          />
        </div>
        <div className="p-2">
          <h3 className="text-xl font-bold">Revive chanh muối</h3>
          <h3 className="text-base">15.000đ</h3>
        </div>
      </div>
    </>
  );
};
export default ImagePreview;
