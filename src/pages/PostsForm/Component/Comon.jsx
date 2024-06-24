import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile, faFolder, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { PriceFormatter } from "../../../utils/convertData";

export const StatusPost = {
  PENDING: 0,
  DONE: 1,
  HIDE: 2,
};



export const columList = () => {
  return [
    {
      headerName: "Giờ bắt đầu",
      field: "TimeFrom",
      editable: false,
      cellRenderer: (param) => {
        return param.value.toTimeString().substring(0, 5);
      },
    },
    {
      headerName: "Giờ kết thúc",
      field: "TimeTo",
      editable: false,
      cellRenderer: (param) => {
        return param.value.toTimeString().substring(0, 5);
      },
    },
    {
      headerName: "Giá",
      field: "Price",
      editable: true,
      valueFormatter: PriceFormatter,
      valueParser: (params) => {
        return parseInt(params.newValue.toString().replace(/[^\d]/g, ""), 10);
      },
    },
    {
      headerName: "Sử dụng",
      field: "Enable",
      editable: true,
      // cellRenderer: "checkboxRenderer",
      cellRendererParams: {
        checkbox: true,
      },
      cellRenderer: (param) => {
        return <Checkbox checked={param.value} disabled />;
      },
    },
  ];
};

export const CheckboxRenderer = (params) => {
  return (
    <Checkbox
      checked={params.value}
      onChange={() => {
        params.node.setDataValue(params.colDef.field, !params.value);
      }}
    />
  );
};
