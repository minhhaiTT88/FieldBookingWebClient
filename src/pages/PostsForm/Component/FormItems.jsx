import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useGlobalConst } from "../../../utils/constData";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";

import { getBase64 } from "../../../utils/convertData";
import { CheckboxRenderer, columList } from "./Comon";
import { AgGridReact } from "ag-grid-react";

const FormItems = React.forwardRef(({ formInstance, action, data }, ref) => {
  const globalConst = useGlobalConst();

  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);
  const [Is_Private, setIs_Private] = useState(0);

  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (data) {
      setIs_Private(data.Is_Private);

      if (data?.Thumbnail_File_Url) {
        setPreviewImage(data.Thumbnail_File_Url);
      }
    }
  }, [data]);

  const handleChange = ({ file: newFile, fileList: newFileList }) => {
    formInstance.setFieldValue("Post_Thumbnail", newFile);
    setFileList([newFile]);
  };

  const customRequest = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    getBase64(file, (data) => {
      if (data) {
        file.preview = data;
        setPreviewImage(data);
        onSuccess("Ok");
      } else {
        onError();
      }
    });
  };

  const props_btn_upload = {
    fileList: fileList,
    accept: "image/png, image/jpeg",
    showUploadList: false,
    customRequest: customRequest,
    onChange: handleChange,
  };

  const validateFileattach = async (rule, value) => {
    if (!fileList.length) {
      throw new Error("Không được để trống");
    }
  };

  const columns = columList();

  const [listTimeSlot, setListTimeSlot] = useState([]);

  const generateTimeSlots = (minHour, maxHour, breakMinutes, matchDurationMinutes) => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(minHour, 0, 0, 0);
    const TimeTo = new Date();
    TimeTo.setHours(maxHour, 0, 0, 0);

    while (currentTime < TimeTo) {
      let start = new Date(currentTime);
      let end = new Date(currentTime);
      end.setMinutes(end.getMinutes() + matchDurationMinutes);
      if (end > TimeTo) break;

      slots.push({
        TimeFrom: start,
        TimeTo: end,
        Price: 700000,
        Enable: true,
      });

      currentTime.setMinutes(currentTime.getMinutes() + matchDurationMinutes + breakMinutes);
    }
    return slots;
  };

  const handleGenTimeSlot = () => {
    if (listTimeSlot.length > 0) {
      Modal.confirm({
        title: "Cảnh báo",
        content: "Danh sách khung giờ hiện tại sẽ bị ghi đèn, bạn có chắc chắn muốn tạo thực hiện?",
        okText: "Xác nhận",
        cancelText: "Đóng",
        centered: true,
        onOk: () => {
          setListTimeSlot(generateTimeSlots(8, 20, 15, 90));
        },
      });
    } else {
      setListTimeSlot(generateTimeSlots(8, 20, 15, 90));
    }
  };

  const onStopEditting = (event) => {
    let rowData = [];
    event.api.forEachNode((node) => {
      const convertObj = {
        ...node.data,
      };
      rowData.push(convertObj);
    });
    setListTimeSlot(listTimeSlot);
    formInstance.setFieldValue("TimeSlots", rowData);
  };

  return (
    <div className="field-list">
      <Form.Item name={"FootballFieldId"} hidden></Form.Item>

      <Form.Item label={`Tên sân`} name={"Name"} rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}>
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label={`Mô tả`}
        name={"Description"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <div className="pb-4">
        <div className="w-full flex justify-between py-3">
          <h3 className="text-base font-bold">Danh sách khung giờ</h3>
          <Button onClick={handleGenTimeSlot}>Tạo khung giờ</Button>
        </div>

        <div className="ag-theme-quartz" style={{ height: 300, width: "100%" }}>
          <AgGridReact
            rowData={listTimeSlot}
            columnDefs={columns}
            frameworkComponents={{ checkboxRenderer: CheckboxRenderer }}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
              editable: true,
              sortable: true,
              filter: false,
              resizable: false,
            }}
            editType="fullRow"
            stopEditingWhenCellsLoseFocus={true}
            onCellValueChanged={onStopEditting}
          />
        </div>
      </div>
    </div>
  );
});

export default FormItems;
