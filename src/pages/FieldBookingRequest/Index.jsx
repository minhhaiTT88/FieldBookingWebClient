import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Breadcrumb, Button, Form, Modal } from "antd";

import ItemSearch from "./Component/ItemSearch";

import DataTableV2 from "../../components/controls/DataTableV2";

import { Content } from "antd/lib/layout/layout";
import { columStaffDefs } from "./Component/Comon";
import FormItems from "./Component/FormItems";
import { useSearchParams } from "react-router-dom";
import { useFieldBookingApi } from "../../apiHelper/api/FieldBookingApi";

const Index = () => {
  const [searchParams] = useSearchParams();

  const [fieldId, setFieldId] = useState(0);
  const [post, setPost] = useState();

  const apiClient = useFieldBookingApi();
  const [formSearch] = Form.useForm();

  const [form] = Form.useForm();
  const [action, setAction] = useState("");
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState([]);

  useEffect(() => {
    var _id = parseInt(searchParams.get("id") ?? "-1");
    setFieldId(_id);
  }, [searchParams]);

  const ShowModal = (data, action) => {
    if (action === "create") {
      setTitle("Thêm mới");
    } else if (action === "detail") {
      setTitle("Chi tiết");
    } else if (action === "update") {
      setTitle("Cật nhật");
    }
    setAction(action);
    setRowSelected(data);
    setModalOpen(true);
    form.setFieldsValue(data);
  };

  const CloseModal = () => {
    setAction("");
    setRowSelected(undefined);
    setModalOpen(false);
  };

  const HandleDelete = (param) => {
    apiClient
      .Delete(param.StaffId)
      .then((data) => {
        if (data?.code > 0) {
          toast.success(data.message);
          Search();
        } else {
          toast.error(data.message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const HandleUpdate = (param) => {
    apiClient
      .Update(param)
      .then((data) => {
        if (data?.code > 0) {
          toast.success(data.message);
          Search();
        } else {
          toast.error(data.message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const HandleCreate = (param) => {
    apiClient
      .Insert(param)
      .then((data) => {
        if (data?.code > 0) {
          toast.success(data.message);
          Search();
        } else {
          toast.error(data.message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const columns = columStaffDefs({ ShowModal, HandleDelete });

  const refs = useRef({ refDataGrid: useRef(null) });

  const onEvent = (data) => {
    return {
      DataGrid: refs.current.refDataGrid?.current?.onEvent(data),
    };
  };

  const Search = () => {
    formSearch.submit();
    formSearch
      .validateFields()
      .then((values) => {
        onEvent({
          type: "HANDLE_SEARCH",
          data: values,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  };

  useEffect(() => {
    Search();
  }, []);

  return (
    <>
      <div className="content-scroll">
        <Content className="main-layout-content">
          <Breadcrumb className="main-layout-breadcrumb" items={[{ title: "Danh sách nhân sự" }]} />

          <div className="flex-content">
            <div className="card-content"></div>

            <div className="card-content">
              <Form
                className="form-search pb-4"
                form={formSearch}
                onKeyDown={(e) => {
                  if (e.code == "Enter") {
                    Search();
                  }
                }}
              >
                <ItemSearch onSubmit={Search} ShowModal={ShowModal} />
              </Form>
              <DataTableV2
                ref={refs.current.refDataGrid}
                columns={columns}
                SearchData={apiClient.SearchData}
              />
            </div>
          </div>
        </Content>
      </div>

      {modalOpen && (
        <Modal
          title={title}
          centered
          width={1226}
          open={modalOpen}
          onCancel={() => CloseModal()}
          footer={[
            <Button
              key="ok"
              htmlType="submit"
              type="outline"
              hidden={action === "details"}
              onClick={() => {
                form.submit();
                form
                  .validateFields()
                  .then((values) => {
                    console.log(values);
                    if (action === "create") {
                      HandleCreate(values);
                    } else if (action === "update") {
                      HandleUpdate(values);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Xác nhận
            </Button>,
            <Button key="cancel" type="primary" onClick={() => CloseModal()}>
              Đóng
            </Button>,
          ]}
          className="ant-modal-scrollbar"
        >
          <Form
            form={form}
            disabled={action === "details" ? true : false}
            className={action === "details" ? "ant-form-details" : ""}
          >
            <FormItems formInstance={form} action={action} data={rowSelected} />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Index;
