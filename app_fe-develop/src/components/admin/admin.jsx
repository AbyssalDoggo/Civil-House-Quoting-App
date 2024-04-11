import React, { useState, useEffect } from "react";
import {
  AccountBookOutlined,
  TeamOutlined,
  PieChartOutlined,
  GlobalOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Divider, Layout, Menu, theme } from "antd";
import Package from "../Package";
import ManageProject from "./ManageProject";
import ClientList from "../../auth/manager/ClientList";
import ManageNews from "./ManageNews";
import { Link } from "react-router-dom";
import authService from "../../auth/services/auth.service";
import ManageQuotes from "./ManageQuotes";
const { Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    label: "Quản lí dự án",
    icon: <PieChartOutlined />,
    component: <ManageProject />,
  },
  {
    key: "2",
    label: "Quản lí tin tức",
    icon: <GlobalOutlined />,
    component: <ManageNews />,
  },
  {
    key: "3",
    label: "Quản lí gói dịch vụ",
    icon: <AccountBookOutlined />,
    component: <Package />,
  },
  {
    key: "4",
    label: "Quản lí báo giá",
    icon: <AuditOutlined />,
    component: <ManageQuotes />,
  },
  {
    key: "5",
    label: "Quản lí người dùng",
    icon: <TeamOutlined />,
    component: <ClientList />,
  },
];
const Admin = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [currentUser, setCurrentUser] = useState("");
  const [currentRole, setCurrentRole] = useState("");

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user.username);
      setCurrentRole(user.role);
    }
  }, []);

  const logOut = async () => {
    try {
      await authService.logout();
      setCurrentUser(undefined);
      this.props.router.history.push("/home");
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            {currentUser ? (
              <div>
                <li className="nav-item">
                  {/* to={"/profile"} */}
                  <Link className="nav-link2">
                    {currentUser} ({currentRole})
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login" className="nav-link2" onClick={logOut}>
                    Đăng Xuất
                  </Link>
                </li>
              </div>
            ) : (
              <div>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link2">
                    Đăng nhập
                  </Link>
                </li>
              </div>
            )}
          </div>
          <Divider />
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            onClick={(item) => setSelectedMenuItem(item.key)}
          />
          <div
            style={{
              marginTop: "auto",
              textAlign: "center",
            }}
          >
            <Link to={"/home"}>
              <button style={{ width: "100%" }}>Trở về trang chủ</button>
            </Link>
          </div>
        </div>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "0 16px",
            padding: "40px",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {items.find((item) => item.key === selectedMenuItem)?.component}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};
export default Admin;
