import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Breadcrumb, Button, Form, List, Modal, Radio } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faClose,
  faDownload,
  faImage,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { Content } from "antd/lib/layout/layout";

import "./Component/mouse-select.css";
import { FormUpload } from "./Component/FormUpload";

import ImagePreview from "./Component/ImagePreview";

import "./Component/mouse-select.css";
import FormPopup from "../../components/controls/FormPopup";
import { Footer } from "antd/es/layout/layout";
import { useFileAttachApi } from "../../apiHelper/api/FileAttachApi";
import PaginationV2 from "../../components/controls/PaginationV2";
import { getFromToPaging } from "../../utils/commonFunction";

const options = [
  {
    label: "Ngày tải lên",
    value: "created_date",
  },
  {
    label: "Tên",
    value: "file_name",
  },
  {
    label: "Trạng thái",
    value: "status",
    title: "Trạng thái xử lý của hình ảnh",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const apiClient = useFileAttachApi();

  const [searchParams] = useSearchParams();
  const [postsId, setPostsId] = useState(0);
  const [postName, setPostName] = useState("");
  const [orderBy, setOrderBy] = useState("created_date");

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [recordOnPage, setRecordOnPage] = useState(10);

  useEffect(() => {
    var _id = parseInt(searchParams.get("id") ?? "-1");
    setPostsId(_id);
    setPostName(searchParams.get("name") ?? "");
  }, [searchParams]);

  // useEffect(() => {
  //   searchData(1);
  // }, [postsId, orderBy]);

  useEffect(() => {
    searchData(currentPage);
  }, [recordOnPage]);

  const DeleteFile = () => {
    var message = "Bạn có chắc chắn muốn xóa file này?";
    const filesDelete = files.filter((e) => e.isSelected === true) || [];

    if (filesDelete.length > 1) {
      message = "Bạn có chắc chắn muốn xóa những file đã chọn?";
    }

    Modal.confirm({
      title: "Xác nhận",
      content: message,
      okText: "Xác nhận",
      cancelText: "Đóng",
      centered: true,
      onOk: () => {
        if (filesDelete.length > 1) {
          const ids = [];
          filesDelete.map((x) => ids.push(x.File_Id));

          apiClient.Delete_Multiple(ids).then((data) => {
            if (data?.code > 0) {
              toast.success(data.message);
              searchData(currentPage);
            } else {
              toast.error(data.message);
            }
          });
        } else {
          apiClient.Delete(filesDelete[0].File_Id).then((data) => {
            if (data?.code > 0) {
              toast.success(data.message);
              searchData(currentPage);
            } else {
              toast.error(data.message);
            }
          });
        }
      },
    });
  };

  const searchData = (p_curentPage) => {
    const calcPage = getFromToPaging(p_curentPage, recordOnPage);
    let to = calcPage.to;
    let from = calcPage.from;
    setCurrentPage(p_curentPage);

    if (postsId > 0) {
      apiClient
        .SearchFiles(postsId, from, to, orderBy)
        .then((data) => {
          if (data && data.jsondata) {
            const _lst = JSON.parse(data.jsondata);
            // console.log(_lst);
            setTotalRecord(data.totalrows);
            setTotalPages(Math.ceil(data.totalrows / recordOnPage));
            setFiles(_lst);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  const [files, setFiles] = useState([
    { ProductId: 1, Name: "Revive chanh muối", Image: "", Price: 15000, Count: 9999 },
    { ProductId: 2, Name: "Revive chanh muối", Price: 15000, Count: 9999 },
    { ProductId: 3, Name: "Revive chanh muối", Price: 15000, Count: 9999 },
    { ProductId: 4, Name: "Revive chanh muối", Price: 15000, Count: 9999 },
    { ProductId: 5, Name: "Revive chanh muối", Price: 15000, Count: 9999 },
    { ProductId: 6, Name: "Revive chanh muối", Price: 15000, Count: 9999 },
    { ProductId: 7, Name: "Revive chanh muối", Price: 15000, Count: 9999 },
    { ProductId: 8, Name: "Revive chanh muối", Price: 15000, Count: 9999 },
    { ProductId: 9, Name: "Revive chanh muối", Price: 15000, Count: 9999 },
    { ProductId: 10, Name: "Revive chanh muối", Price: 15000, Count: 9999 },
    { ProductId: 12, Name: "Revive chanh muối", Price: 15000, Count: 9999 },
    { ProductId: 13, Name: "Revive chanh muối", Price: 15000, Count: 9999 },
  ]);

  const [indexFirstSelect, setIndexFirstSelect] = useState(0);
  const countFileSelected = React.useMemo(
    () => files.filter((e) => e.isSelected === true).length || 0,
    [files]
  );
  const [fileIdSelected, setFileIdSelected] = useState(0);
  // useEffect(() => {
  //   console.log(files);
  // }, [files]);
  useEffect(() => {
    if (countFileSelected <= 1) {
      const _index = files.findIndex((x) => x.File_Id === fileIdSelected);
      if (_index >= 0) {
        setIndexFirstSelect(_index);
      }
    }
  }, [countFileSelected]);

  const handleClearSelect = (e) => {
    setFiles([
      ...files.map((e, i) => {
        return { ...e, isSelected: false };
      }),
    ]);
  };
  const merge = (a, b, predicate = (a, b) => a === b) => {
    const c = [...a]; // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)));
    return c;
  };
  const cardClick = (e, data) => {
    e.stopPropagation();
    setFileIdSelected(data?.File_Id);

    // if (e.shiftKey) {
    //   // shift key was down during the click
    //   const _indexClicked = files.findIndex((x) => x.File_Id === data?.File_Id);
    //   console.log(_indexClicked, indexFirstSelect);
    //   var listSelected = [];
    //   if (_indexClicked > indexFirstSelect) {
    //     for (var i = indexFirstSelect; indexFirstSelect <= _indexClicked; i++) {
    //       listSelected.push({ ...files[i], isSelected: true });
    //     }
    //   } else {
    //     for (var i = _indexClicked; _indexClicked <= indexFirstSelect; i++) {
    //       listSelected.push({ ...files[i], isSelected: true });
    //     }
    //   }
    //   console.log(merge(files, listSelected, (a, b) => a.id === b.id));
    // } else
    if (e.ctrlKey) {
      // ctrl key was down during the click
      if (data?.File_Id > 0) {
        setFiles([
          ...files.map((e, i) => {
            if (e.File_Id === data?.File_Id) {
              return { ...e, isSelected: true };
            } else {
              return e;
            }
          }),
        ]);
      }
    } else {
      if (data?.File_Id > 0) {
        setFiles([
          ...files.map((e, i) => {
            if (e.File_Id === data?.File_Id) {
              return { ...e, isSelected: true };
            } else {
              return { ...e, isSelected: false };
            }
          }),
        ]);
      }
    }
  };

  const FormItem = ({ form, action, rowSelected }) => {
    return <FormUpload form={form} />;
  };
  const refs = useRef({
    refForm: useRef(null),
  });
  const onEvent = (data) => {
    return {
      Form: refs.current.refForm?.current?.onEvent(data),
    };
  };
  const ShowModal = () => {
    onEvent({
      type: "OPEN_POPUP",
      data: { action: "insert" },
    });
  };

  const [listFileUploading, setListFileUploading] = useState([]);

  const [firstUpload, setFirstUpload] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const countFileInProcess = React.useMemo(
    () => listFileUploading.filter((e) => e.status_upload != "done").length || 0,
    [listFileUploading]
  );
  const countFileDone = React.useMemo(
    () => listFileUploading.filter((e) => e.status_upload == "done").length || 0,
    [listFileUploading]
  );
  const statusUpload = React.useMemo(
    () =>
      countFileInProcess <= 0
        ? `Đã tải lên ${countFileDone} file`
        : `Đang tải lên ${countFileInProcess}/${listFileUploading.length} file`,
    [countFileInProcess, countFileDone]
  );

  const OnSubmit = async (values, action) => {
    setListFileUploading(values.ListFile || []);
    setFirstUpload(true);
    setIsShow(true);
    setCollapsed(false);
    return "";
  };

  useEffect(() => {
    if (listFileUploading.length > 0 && firstUpload) {
      setFirstUpload(false);
      listFileUploading.forEach((item) => {
        apiClient.AddFile(item, postsId);
      });
      setListFileUploading(listFileUploading);
    }
  }, [listFileUploading]);

  const OnCloseStatusUpload = () => {
    if (countFileInProcess > 0) {
      //vẫn còn file đang được tải lên thì cảnh báo
      Modal.confirm({
        title: "Cảnh báo",
        content: "Quá trình tải file của bạn sẽ vẫn được thực hiện?",
        okText: "Xác nhận",
        cancelText: "Đóng",
        centered: true,
        onOk: () => {
          setIsShow(false);
          setListFileUploading([]);
        },
      });
    } else {
      setIsShow(false);
      setListFileUploading([]);
    }
  };

  const processSocket = (event) => {
    try {
      if (event?.detail) {
        if (event.detail.type === "POST_FILE_STATUS") {
          var _lstOld = listFileUploading.slice();

          if (event.detail.content && listFileUploading && listFileUploading.length > 0) {
            setListFileUploading([
              ..._lstOld.map((e, i) => {
                if (e.name === event.detail.content) {
                  return { ...e, status_upload: "done" };
                } else {
                  return e;
                }
              }),
            ]);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    document.addEventListener("socket-message", processSocket);
    return () => {
      document.removeEventListener("socket-message", processSocket);
    };
  }, [listFileUploading]);

  //sondt commit để phát triển sau, select bằng mouse drag
  // const [selectionBox, setSelectionBox] = useState();
  // const [selectedIndexes, setSelectedIndexes] = useState([]);
  // const selectableItems = useRef([]);
  // const elementsContainerRef = useRef(null);
  // const boxScrollReff = useRef(null);

  // const { DragSelection } = useSelectionContainer({
  //   eventsElement: document.getElementById("root"),
  //   onSelectionChange: (box) => {

  //     const scrollAwareBox = {
  //       ...box,
  //       top: box.top + boxScrollReff?.current?.scrollTop,
  //       left: box.left ,
  //     };
  //     console.log("box ", box);
  //     console.log("scrollAwareBox ", scrollAwareBox);
  //     setSelectionBox(scrollAwareBox);
  //     const indexesToSelect = [];
  //     selectableItems.current.forEach((item, index) => {
  //       if (boxesIntersect(scrollAwareBox, item)) {
  //         indexesToSelect.push(index);
  //       }
  //     });

  //     setSelectedIndexes(indexesToSelect);
  //   },
  //   onSelectionStart: () => {
  //     console.log("OnSelectionStart");
  //   },
  //   onSelectionEnd: () => console.log("OnSelectionEnd"),
  //   selectionProps: {
  //     style: {
  //       border: "1px solid #9f9f9f",
  //       borderRadius: 4,
  //       backgroundColor: "#3535352e",
  //     },
  //   },
  //   isEnabled: true,
  // });

  // useEffect(() => {
  //   if (elementsContainerRef.current) {
  //     Array.from(elementsContainerRef.current.children).forEach((item) => {
  //       const { left, top, width, height } = item.getBoundingClientRect();
  //       selectableItems.current.push({
  //         left,
  //         top,
  //         width,
  //         height,
  //       });
  //     });
  //   }
  // }, []);

  // return (
  //   <>
  //     <div className="h-screen">
  //       <div className="container h-full overflow-scroll" id="container" ref={boxScrollReff}>
  //         <DragSelection />
  //         <div id="elements-container" className="elements-container" ref={elementsContainerRef}>
  //           {Array.from({ length: 50 }, (_, i) => (
  //             <div
  //               data-testid={`grid-cell-${i}`}
  //               key={i}
  //               className={`element ${selectedIndexes.includes(i) ? "selected" : ""} `}
  //             />
  //           ))}
  //         </div>

  //         <div className="selection-box-info">
  //           Selection Box:
  //           <div>top: {selectionBox?.top || ""}</div>
  //           <div>left: {selectionBox?.left || ""}</div>
  //           <div>width: {selectionBox?.width || ""}</div>
  //           <div>height: {selectionBox?.height || ""}</div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div className={isShow ? "upload-file-status rounded-t-2xl " : "hidden"}>
        <div className="title rounded-t-2xl flex justify-between items-center px-4">
          <div className="py-3 text-left ">{statusUpload}</div>
          <div>
            <Button
              size="small"
              type="text"
              shape="circle"
              icon={
                <FontAwesomeIcon
                  icon={collapsed ? faChevronUp : faChevronDown}
                  onClick={() => setCollapsed(!collapsed)}
                />
              }
            />
            <Button
              size="small"
              type="text"
              shape="circle"
              icon={<FontAwesomeIcon icon={faXmark} onClick={OnCloseStatusUpload} />}
            />
          </div>
        </div>

        <div className="bg-white p-px">
          <div className={collapsed ? "hidden" : "list"}>
            {listFileUploading.map((item, k) => {
              return (
                <div className="item flex justify-between p-4 items-center" key={k}>
                  <div className="flex gap-3 items-center">
                    <FontAwesomeIcon className="text-lg" icon={faImage} color="red" />
                    <span>{item.name}</span>
                  </div>
                  {item.status_upload == "done" ? (
                    <FontAwesomeIcon
                      className="text-md"
                      icon={faCheckCircle}
                      color="rgb(52, 168, 83)"
                    />
                  ) : (
                    <div className="lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="content-scroll" id="portal">
        <Content className="main-layout-content">
          <Breadcrumb
            className="main-layout-breadcrumb"
            items={[{ title: "Danh sách bài viết" }, { title: "Danh sách file" }]}
          />

          <div className="flex-content card-content">
            <div className="flex justify-between item-start">
              <div className="flex flex-col items-start gap-3">
                <div className="text-xl font-bold">Danh sách file của bài viết: {postName}</div>
                {countFileSelected > 0 ? (
                  <>
                    <div className="flex flex-nowrap bg-[#dbdee3] py-1 pr-5 rounded-full">
                      <div className="flex flex-nowrap justify-start pl-5 pr-24">
                        {/* <Button type="text" shape="circle" className="">
                          <FontAwesomeIcon className="text-xs" icon={faDownload} />
                        </Button> */}
                        <Button type="text" shape="circle" className="">
                          <FontAwesomeIcon
                            className="text-xs"
                            icon={faTrash}
                            onClick={DeleteFile}
                          />
                        </Button>
                      </div>
                      <Button type="text" shape="circle" className="" onClick={handleClearSelect}>
                        <FontAwesomeIcon className="text-xs" icon={faClose} />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2 items-center">
                      <label>Sắp xếp</label>
                      <Radio.Group
                        onChange={(e) => setOrderBy(e.target.value)}
                        value={orderBy}
                        optionType="button"
                        options={options}
                      />
                    </div>
                  </>
                )}
              </div>
              <div>
                <Button
                  onClick={() => {
                    ShowModal();
                  }}
                  type="primary"
                >
                  Tải lên
                </Button>
              </div>
            </div>
            <div className="bg-[#e2e5e9]">
              <div onClick={handleClearSelect} className="not_allow_hightlight">
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
                  dataSource={files}
                  renderItem={(item) => (
                    <List.Item>
                      <ImagePreview image={item} onClick={cardClick} />
                    </List.Item>
                  )}
                />
              </div>
              <PaginationV2
                totalPages={totalPages}
                currentPage={currentPage}
                totalRecord={totalRecord}
                recordOnPage={recordOnPage}
                setRecordOnPage={setRecordOnPage}
                searchData={searchData}
              />
            </div>
          </div>

          <Footer
            style={{
              textAlign: "center",
            }}
          >
            SQ SOFT ©{new Date().getFullYear()} Created by
          </Footer>
        </Content>
      </div>

      <FormPopup
        formTitle={() => "Tải file"}
        formContent={FormItem}
        submit={OnSubmit}
        ref={refs.current.refForm}
      />
    </>
  );
};

export default Index;
