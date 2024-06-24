import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Breadcrumb, Button, Form, Modal } from "antd";

import ItemSearch from "./Component/ItemSearch";

import DataTableV2 from "../../components/controls/DataTableV2";

import { Content } from "antd/lib/layout/layout";
import { columStaffDefs } from "./Component/Comon";
import FormItems from "./Component/FormItems";
import { useStaffApi } from "../../apiHelper/api/StaffApi";

const Index = () => {
  const apiClient = useStaffApi();
  const [formSearch] = Form.useForm();

  const [form] = Form.useForm();
  const [action, setAction] = useState("");
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState([]);

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

  const dataSearch = async (keySearch, from, to, orderBy) => {
    const staffList = [];

    for (let i = 1; i <= 14; i++) {
      const staff = {
        StaffId: i,
        StaffName: `Staff Name ${i}`,
        PhoneNumber: `123-456-789${i}`,
        IdentityNumber: `ID${i}`,
        StaffPosition: `Position ${i}`,
        Birthofdate: new Date(1990 + i, i % 12, i),
        Sex: i % 2 === 0 ? "Male" : "Female",
        SexText: i % 2 === 0 ? "Male" : "Female",
        Status: i % 3 === 0 ? "Active" : "Inactive",
        StatusText: i % 3 === 0 ? "Active" : "Inactive",
        Salary: 3000 + i * 100,
        CreatedBy: `Creator ${i}`,
        CreatedDate: new Date(2024, i % 12, i),
        ModifiedBy: `Modifier ${i}`,
        ModifiedDate: new Date(2024, (i + 6) % 12, i),
      };
      staffList.push(staff);
    }

    return { totalrows: staffList.length, jsondata: JSON.stringify(staffList) };
  };

  const data = [];

  return (
    <>
      <div className="content-scroll">
        <Content className="main-layout-content">
          <Breadcrumb className="main-layout-breadcrumb" items={[{ title: "Danh sách nhân sự" }]} />

          <div className="flex-content">
            <div className="card-content">
              <Form
                className="form-search"
                form={formSearch}
                onKeyDown={(e) => {
                  if (e.code == "Enter") {
                    Search();
                  }
                }}
              >
                <ItemSearch onSubmit={Search} ShowModal={ShowModal} />
              </Form>
            </div>

            <div className="card-content">
              <DataTableV2
                ref={refs.current.refDataGrid}
                columns={columns}
                SearchData={dataSearch}
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
