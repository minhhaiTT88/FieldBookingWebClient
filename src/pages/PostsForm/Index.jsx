import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Row,
  Col,
  Divider,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Tooltip,
  Breadcrumb,
  Upload,
} from "antd";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faPlus, faTrash, faFileLines } from "@fortawesome/free-solid-svg-icons";

import { AgGridReact } from "ag-grid-react";

import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { usePostsApi } from "../../apiHelper/api/PostsApi";
import { useGlobalConst } from "../../utils/constData";
import { getUserFromStorage } from "../../store/actions/sharedActions";
import { formatDate, formatNumber, getBase64 } from "../../utils/convertData";
import { Content } from "antd/lib/layout/layout";
import FormItems from "./Component/FormItems";

const { TextArea } = Input;

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    toast.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    toast.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();

  const globalConst = useGlobalConst();

  const apiClient = usePostsApi();

  const [postId, setPostId] = useState(0);
  const [post, setPost] = useState();
  const [action, setAction] = useState("create");
  const [actionTitle, setActionTitle] = useState("");

  const [Is_Private, setIs_Private] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (action === "create") {
      setActionTitle("Thêm mới");
    } else if (action === "update") {
      setActionTitle("Cập nhật");
    } else if (action === "detail") {
      setActionTitle("Xem chi tiết");
    }
  }, [action]);

  useEffect(() => {
    var _id = parseInt(searchParams.get("id") ?? "-1");
    setPostId(_id);
  }, [searchParams]);

  useEffect(() => {
    if (postId != undefined && postId > 0) {
      //load post
      setAction(searchParams.get("action").trim());
      apiClient
        .GetById(postId)
        .then((data) => {
          if (data && data?.jsondata) {
            var obj = JSON.parse(data.jsondata);
            setPost(obj);
            form.setFieldsValue(obj);

            // form.setFieldValue("Post_Thumbnail", {
            //   fileName: obj.Thumbnail_File_name,
            // });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setAction("create");
      form.setFieldValue("Is_Private", Is_Private);
    }
  }, [postId]);

  const OnSubmit = () => {
    form.submit();
    form
      .validateFields()
      .then((values) => {
        if (action == "create") {
          apiClient
            .Insert(values)
            .then((res) => {
              if (res && res.code > 0) {
                toast.success(res.message);
                navigate("/quan-ly-bai-viet");
              } else {
                toast.error(res.message);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (action == "update") {
          apiClient
            .Update(values)
            .then((res) => {
              if (res && res.code > 0) {
                toast.success(res.message);
                location.reload();
              } else {
                toast.error(res.message);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="content-scroll">
        <Content className="main-layout-content">
          <Breadcrumb
            className="main-layout-breadcrumb"
            items={[{ title: "Danh sách bài viết" }, { title: actionTitle }]}
          />
          <div className="card-content">
            <Form form={form} disabled={action === "detail"}>
              <FormItems formInstance={form} action={action} data={post} />
            </Form>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type={"primary"} style={{ marginRight: "8px" }} onClick={OnSubmit}>
                Lưu
              </Button>
              <NavLink to={`/quan-ly-bai-viet`}>
                <Button type="outline">Quay lại</Button>
              </NavLink>
            </div>
          </div>
        </Content>
      </div>
    </>
  );
};

export default Index;
