import React, { useState, useEffect, useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import Cookies from "js-cookie";
import link from "../assets/images/icons/link.png";
import logo from "/images/icons/logo.png";
import dashboard from "../assets/images/icons/dashboard.png";
import task from "/images/icons/task.png";
import employees from "/images/icons/employees.png";
import estates from "/images/icons/estates.png";
import payment from "/images/icons/payment.png";
import invoice from "/images/icons/invoice.png";
import leads from "/images/icons/leads.png";
import { Layout, Menu, Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

const today = new Date();
const formattedDate = formatDate(today);

const items = [
  getItem(
    "Over View",
    "/dashboard",
    <img src={dashboard} alt="" className="w-3" />
  ),
  // getItem("Task Manager", "/task-manager", <img src={task} alt="" className="w-5" />),
  getItem(
    "Employees",
    "/employees",
    <img src={employees} alt="" className="w-5" />
  ),
  getItem("Estates", "/estates", <img src={estates} alt="" className="w-5" />),
  getItem("Payment", "/payment", <img src={payment} alt="" className="w-5" />),
  getItem(
    "Subscribe",
    "/subscribers",
    <img src={invoice} alt="" className="w-5" />
  ),
  getItem("Leads", "/leads", <img src={leads} alt="" className="w-5" />),
  getItem(
    "Invoices",
    "/invoices",
    <img src={invoice} alt="" className="w-5" />
  ),
  getItem(
    "Configuration",
    "/configuration",
    <img src={invoice} alt="" className="w-5" />
  ),
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { loggedInUser, logout } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useLocation();
  const estate = state?.estate;

  // console.log(estate)

  const activeMenuKey =
    location.pathname === "/estates/prototypes"
      ? "/estates"
      : location.pathname;

  let title = "Default Title";

  switch (location.pathname) {
    case "/dashboard":
      title = "Over View";
      break;
    // case "/task-manager":
    //   title = "Task Manager";
    //   break;
    case "/employees":
      title = "Employees";
      break;
    case "/estates":
      title = "Estates";
      break;
    case "/estates/prototypes":
      title = estate?.name;
      break;
    case "/leads":
      title = "Leads";
      break;
    case "/payment":
      title = "Payments";
      break;
    case "/invoices":
      title = "Invoices";
      break;
    case "/subscribers":
      title = "Subscribers";
      break;
    case "/configuration":
      title = "Configuration";
      break;
    default:
      title = "";
  }

  const dropdownItems = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Personal Info
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer">
          System Settings
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" className="!text-red-500">
          Log Out
        </a>
      ),
      key: "2",
    },
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  const handleLogout = () => {
    Cookies.remove("loggedInUser"); // Updated to correct cookie name
    Cookies.remove("accessToken"); // Remove accessToken cookie
    logout(); // Call logout from context
    navigate("/admin-login");
  };

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        style={{
          backgroundColor: "#ffffff",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
          position: "fixed",
          height: "100vh",
        }}
      >
        <div className="p-2 py-3 text-xl font-bold flex items-center">
          <img src={logo} alt="" className="w-12 mx-2" />
          {!collapsed && (
            <div>
              <p className="text-xs bg-[#F5F5F5] text-[#000068] p-1 rounded-md text-center">
                Super-Admin
              </p>
              <h2 className="text-[1.6rem]">ileFund</h2>
            </div>
          )}
        </div>
        <Menu
          theme="light"
          // selectedKeys={[location.pathname]}
          selectedKeys={[activeMenuKey]}
          mode="inline"
          items={items}
          className="custom-menu"
          onClick={handleMenuClick}
        />
        <div className="flex justify-center items-center flex-col relative top-10">
          <Button
            onClick={handleLogout}
            className={`flex items-center mt-10 text-sm font-semibold border-none hover:!text-black shadow-none ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <img src={link} alt="" className="w-4" />
            {!collapsed && <span className="hidden sm:inline">Log Out</span>}
          </Button>
        </div>
      </Sider>
      <Layout
        className="p-5"
        style={{ marginLeft: collapsed ? "80px" : "200px" }}
      >
        <div
          className="fixed bg-white top-0 z-10 py-4 px-4"
          style={{
            left: collapsed ? "80px" : "200px",
            width: collapsed ? "calc(100% - 80px)" : "calc(100% - 200px)",
            transition: "left 0.3s, width 0.3s",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-xl text-[#000068]">{title}</h2>
              {formattedDate}
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-red-500 rounded-full h-11 w-11">hh</div>
              <Dropdown
                menu={{ items: dropdownItems }}
                trigger={["click"]}
                className="hover:!text-black"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div>
                      <div>
                        <h2 className="font-bold text-lg">
                          {loggedInUser?.firstName} {loggedInUser?.lastName}
                        </h2>
                        <p className="!text-gray-400">{loggedInUser?.email}</p>
                      </div>
                    </div>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
