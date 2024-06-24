//view
import Dashboard from "../pages/Dashboard/Index";

import PostList from "../pages/PostsList/Index";
import Product from "../pages/Product/Index";
import Field from "../pages/Field/Index";
import Staff from "../pages/Staff/Index";
import Store from "../pages/Store/Index";
import FieldBooking from "../pages/FieldBooking/Index";
import FieldBookingList from "../pages/FieldBookingList/Index";
import FieldBookingRequest from "../pages/FieldBookingRequest/Index";
import FieldBookingPayment from "../pages/FieldBookingPayment/Index";
import PostsForm from "../pages/PostsForm/Index";
import PostsFile from "../pages/PostsFile/Index";
import Customer from "../pages/Customer/Index";

//layout
import LayoutLeftSideBar from "../components/layout/LayoutLeftSideBar";
import LayoutDashboard from "../components/layout/LayoutDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBottleWater,
  faBowlFood,
  faFolder,
  faFutbol,
  faFutbolBall,
  faHome,
  faIdBadge,
  faListCheck,
  faMoneyBill,
  faStore,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import LayoutEmpty from "../components/layout/LayoutEmpty";

export const RoutersConfig = [
  {
    Function_Id: "DASHBOARD",
    Function_Name: "Trang chủ",
    icon: <FontAwesomeIcon icon={faHome} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/",
    pageLayout: LayoutDashboard,
    pageContent: { component: Dashboard },
  },
  {
    Function_Id: "FEILD_BOOKING",
    Function_Name: "Đặt sân",
    icon: <FontAwesomeIcon icon={faMoneyBill} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/dat-san",
    pageLayout: LayoutEmpty,
    pageContent: { component: FieldBooking },
  },
];
