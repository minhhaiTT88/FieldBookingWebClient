//view
import DashboardV2 from "../pages/DashboardV2/Index";

//layout
import LayoutDashboard from "../components/layout/LayoutDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
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
    pageContent: { component: DashboardV2 },
  },
];
