import { PriceFormatter, formatDate } from "../../../utils/convertData";
import { Button, Modal, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export const STAFF_STATUS = {
  dangLamViec: "A",
  daNghiViec: "B",
};

export const columStaffDefs = ({ ShowModal, HandleDelete }) => {
  return [
    {
      field: "FieldBookingIdStr",
      headerName: "Mã đơn",
      width: 200,
    },
    {
      field: "StatusText",
      headerName: "Trạng thái",
      cellRenderer: (e) => {
        if (e.data.Status == STAFF_STATUS.daNghiViec) {
          return (
            <div>
              <span className="rounded-pill text-light-yellow">{e.data.StatusText}</span>
            </div>
          );
        } else if (e.data.Status == STAFF_STATUS.dangLamViec) {
          return (
            <div>
              <span className="rounded-pill text-light-green">{e.data.StatusText}</span>
            </div>
          );
        } else {
          return <p>{e.data.StatusText}</p>;
        }
      },
      width: 150,
    },
    // {
    //   field: "FieldName",
    //   headerName: "Tên sân",
    //   width: 100,
    // },
    {
      field: "CustomerName",
      headerName: "Tên khách hàng",
      width: 180,
    },
    {
      field: "BookingDate",
      headerName: "Ngày đặt",
      width: 250,
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      field: "TimeFrom",
      headerName: "Khung giờ",
      width: 250,
      cellRenderer: (data) => {
        return `${formatDate(data.value, "hh:mm")}-${formatDate(data.data.TimeTo, "hh:mm")}`;
      },
    },
    {
      field: "Cash",
      headerName: "Số tiền đã thanh toán",
      valueFormatter: PriceFormatter,
      width: 250,
    },
    {
      field: "CreatedDate",
      headerName: "Ngày tạo",
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
              <Tooltip placement="top" title="Xem chi tiết">
                <Button
                  type="actions"
                  onClick={() => {
                    ShowModal && ShowModal(e.data, "detail");
                  }}
                >
                  <FontAwesomeIcon icon={faEye} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Cập nhật">
                <Button
                  type="actions"
                  onClick={() => {
                    ShowModal && ShowModal(e.data, "update");
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Từ chối">
                <Button
                  type="actions"
                  onClick={() => {
                    Modal.confirm({
                      title: "Xác nhận",
                      content: "Bạn có chắc chắn muốn từ chối đơn đặt sân này?",
                      okText: "Xác nhận",
                      cancelText: "Đóng",
                      centered: true,
                      onOk: () => {
                        HandleDelete && HandleDelete(e.data);
                      },
                    });
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
