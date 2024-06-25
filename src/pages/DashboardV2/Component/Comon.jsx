import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/convertData";
import { Button, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile, faFolder, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export const FIELD_BOOKING_STATUS = {
  pending: "P",
  approved: "A",
  done: "D",
  leave_deposit: "L",
  reject: "X",
};

export const FIELD_STATUS = {
  active: "A",
  inactive: "I",
};

export const DateLabel = ({ date, day, isDateNow }) => {
  return (
    <span className={`${isDateNow && "underline"}`}>
      <h2 className="text-xl font-bold">{day}</h2>
      <h3 className="text-base">{date}</h3>
    </span>
  );
};

export function getNextSixDays() {
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  let daysList = [];
  for (let i = 0; i <= 6; i++) {
    let date = moment().add(i, "days");
    let _isDateNow = date.format("DD/MM") === moment().format("DD/MM");

    let dayObj = {
      key: date.format("YYYY-MM-DD"),
      label: (
        <DateLabel
          date={date.format("DD/MM")}
          day={daysOfWeek[date.day()]}
          isDateNow={_isDateNow}
        />
      ),
      isDateNow: _isDateNow,
    };
    daysList.push(dayObj);
  }
  return daysList;
}

export const columPostList = ({ DeletePost }) => {
  const navigate = useNavigate();
  return [
    {
      field: "Name",
      headerName: "Tên sản phẩm",
      cellRenderer: (e) => {
        return (
          <Link
            to={`/quan-ly-bai-viet/quan-ly-file?id=${e.data.Post_Id}&name=${encodeURIComponent(
              e.data.Post_Name
            )}`}
          >
            {e.value}
          </Link>
        );
      },
      width: 300,
    },
    {
      field: "Số lương",
      headerName: "Loại bài viết",

      width: 250,
    },
    {
      field: "Created_Date",
      headerName: "Ngày đăng",
      width: 250,
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      field: "Created_By",
      headerName: "Người đăng",

      width: 250,
    },
    {
      field: "Modified_Date",
      headerName: "Ngày cập nhật cuối cùng",
      width: 250,
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      headerName: "Chức năng",
      pinned: "right",
      width: 250,
      suppressSizeToFit: true,
      resizable: false,
      cellRenderer: (e) => {
        return (
          <>
            <div className="ag-cell-actions">
              <Tooltip placement="top" title="Quản lý file">
                <Button
                  type="actions"
                  onClick={() => {
                    const strEncode = encodeURIComponent(e.data.Post_Name);

                    navigate(
                      `/quan-ly-bai-viet/quan-ly-file?id=${e.data.Post_Id}&name=${strEncode}`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faFolder} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Xem chi tiết">
                <Button
                  type="actions"
                  onClick={() => {
                    navigate(`/quan-ly-bai-viet/bai-viet?id=${e.data.Post_Id}&action=detail`);
                  }}
                >
                  <FontAwesomeIcon icon={faEye} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Cập nhật">
                <Button
                  type="actions"
                  onClick={() => {
                    navigate(`/quan-ly-bai-viet/bai-viet?id=${e.data.Post_Id}&action=update`);
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Xóa">
                <Button
                  type="actions"
                  onClick={() => {
                    DeletePost(e.data.Post_Id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} color="#999" />
                </Button>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];
};
