import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Row,
  Select,
} from "antd";

import ItemSearch from "./Component/ItemSearch";

import { usePostsApi } from "../../apiHelper/api/PostsApi";
import { Content } from "antd/lib/layout/layout";
import { columPostList } from "./Component/Comon";
import { Footer } from "antd/es/layout/layout";
import PaginationV2 from "../../components/controls/PaginationV2";
import ProductCard from "./Component/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister, faPlus, faSubtract, faTrash } from "@fortawesome/free-solid-svg-icons";
import ItemInCart from "./Component/ItemInCart";
import { formatNumberV2 } from "../../utils/convertData";
import { useGlobalConst } from "../../utils/constData";
import { useBillApi } from "../../apiHelper/api/BillApi";

const Index = () => {
  const globalConst = useGlobalConst();
  const apiClient = useBillApi();
  const [formSearch] = Form.useForm();
  const [formPayment] = Form.useForm();

  const [listProduct, setListProduct] = useState([
    { ProductId: 1, Name: "Revive chanh muối", Price: 15000, Count: 3 },
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

  const [listProductInCart, setListProductInCart] = useState([
    { ProductId: 1, Name: "Revive chanh muối", Image: "", Price: 15000, Total: 15000, Count: 1 },
    { ProductId: 2, Name: "Revive chanh muối", Price: 15000, Total: 15000, Count: 1 },
    { ProductId: 3, Name: "Revive chanh muối", Price: 15000, Total: 15000, Count: 2 },
  ]);

  const totalBill = useMemo(() => {
    return listProductInCart.reduce((acc, product) => acc + product.Total, 0);
  }, [listProductInCart]);

  // useEffect(() => {
  //   Search();
  // }, []);

  useEffect(() => {
    formPayment.setFieldValue("BillDetails", listProductInCart);
  }, [listProductInCart]);

  useEffect(() => {
    formPayment.setFieldValue("Total", totalBill);
  }, [totalBill]);

  const handleAddItem = (item) => {
    //tìm sản phẩm vừa chọn trong giỏ hàng
    const find = listProductInCart.find((x) => x.ProductId === item.ProductId);

    if (find) {
      //nếu có trong giỏ hàng rồi thì cộng số lượng lên 1
      handleUpdateCount(find, find.Count + 1);
    } else {
      //nếu chưa có trong giỏ hàng thì thêm vào với số lượng là 1
      const lstInCartNew = [...listProductInCart];
      lstInCartNew.push({ ...item, Count: 1, Total: item.Price });
      setListProductInCart(lstInCartNew);
    }
  };

  const handleSubtractItem = (item) => {
    handleUpdateCount(item, item.Count - 1);
  };

  const handlePlusItem = (item) => {
    handleUpdateCount(item, item.Count + 1);
  };

  const handleRemoveItem = (item) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
      okText: "Xác nhận",
      cancelText: "Đóng",
      centered: true,
      onOk: () => {
        const lstInCartNew = listProductInCart.filter((x) => x.ProductId !== item.ProductId);
        setListProductInCart(lstInCartNew);
      },
    });
  };

  const handleUpdateCount = (item, newCount) => {
    if (newCount === 0) {
      //nếu số lượng mới là 0 thì xóa khỏi giỏ hàng
      handleRemoveItem(item);
    } else {
      //tìm thông tin sản phẩm trong danh sách sản phẩm
      const product = listProduct.find((x) => x.ProductId === item.ProductId);
      if (newCount > product.Count) {
        //nếu như số lượng mới cần cập nhật trong giỏ hàng lớn hơn số lượng sản phẩm trong kho thì báo lỗi
        toast.error("Số lượng sản phẩm đã đạt mức tối đa");
        return -1;
      }

      //cập nhật số lượng trong giỏ hàng bằng newCount và tính lại tổng giá
      const lstInCartNew = listProductInCart.map((e) => {
        const newTotal = e.Price * newCount;
        if (e.ProductId === item.ProductId) {
          return {
            ...e,
            Count: newCount,
            Total: newTotal,
          };
        } else {
          return e;
        }
      });
      setListProductInCart(lstInCartNew);
    }
  };

  const handlePayment = () => {
    formPayment.submit();
    formPayment
      .validateFields()
      .then((values) => {
        apiClient
          .Insert(values)
          .then((res) => {
            if (res && res.code > 0) {
              toast.success(res.message);
              //thanh toán thành công thì reset dữ liệu trong trang
              handleRefresh();
            } else {
              toast.error(res.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRefresh = () => {};

  return (
    <>
      <div className="content-scroll h-screen scroll">
        <Content className="main-layout-content">
          <Breadcrumb className="main-layout-breadcrumb" items={[{ title: "Tạo hóa đơn" }]} />

          <div className="flex-content">
            <Row>
              <Col span={16}>
                <div>
                  <div className="card-content">
                    <Form
                      className="form-search"
                      form={formSearch}
                      onKeyDown={(e) => {
                        if (e.code == "Enter") {
                          // Search();
                        }
                      }}
                    >
                      <ItemSearch
                      // onSubmit={Search}
                      />
                    </Form>
                  </div>
                  <div className="not_allow_hightlight mt-4">
                    <List
                      pagination={{ pageSize: 10, align: "center" }}
                      grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 2,
                        md: 2,
                        lg: 3,
                        xl: 4,
                        xxl: 6,
                      }}
                      dataSource={listProduct}
                      renderItem={(item) => (
                        <List.Item>
                          <ProductCard item={item} onClick={handleAddItem} />
                        </List.Item>
                      )}
                    />
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <Form className="form-search" form={formPayment}>
                  <Form.Item name={"BillDetails"} hidden />
                  <Form.Item name={"Total"} hidden />
                  <div className="card-content ml-4">
                    <div>
                      <div className="ant-form-control ant-form-input">
                        <label>Sân</label>
                        <Form.Item
                          name={"FieldId"}
                          mode="single"
                          // rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                        >
                          <Select
                            mode="single"
                            optionFilterProp="children"
                            placeholder="-- Lựa chọn -- "
                            allowClear
                            showSearch
                          >
                            {/* {allCode
                            ?.filter((e) => e.Cdname === "YZ_POSTS" && e.Cdtype === "IS_PRIVATE")
                            .map((item, key) => (
                              <Select.Option key={key} value={+item.Cdval}>
                                {item.Content}
                              </Select.Option>
                            ))} */}
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="ant-form-control ant-form-input">
                        <label>Tên khách hàng</label>
                        <Form.Item
                          name={"CustomerName"}
                          // rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <div className="ant-form-control ant-form-input">
                        <label>Số điện thoại</label>
                        <Form.Item
                          name={"CustomerPhone"}
                          // rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="max-h-80 scroll">
                      {listProductInCart.map((item) => (
                        <ItemInCart
                          item={item}
                          onPlus={handlePlusItem}
                          onSubTract={handleSubtractItem}
                          onRemove={handleRemoveItem}
                          onUpdateCount={handleUpdateCount}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-4 my-4 text-base">
                      <span>Tổng tiền</span>
                      <span className="font-bold">{formatNumberV2(totalBill)}đ</span>
                    </div>
                    {/* <div className="w-full flex justify-end"> */}
                    <Button
                      type="primary"
                      size="large"
                      className="light-orange w-full"
                      onClick={handlePayment}
                    >
                      <FontAwesomeIcon icon={faCashRegister} />
                      <span>Thanh toán</span>
                    </Button>
                    {/* </div> */}
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
      </div>
    </>
  );
};

export default Index;
