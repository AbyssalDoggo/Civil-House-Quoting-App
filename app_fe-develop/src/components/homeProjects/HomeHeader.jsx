import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Row, Col } from "antd";
import authService from "../../auth/services/auth.service";

const HomeHeader = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const logOut = () => {
    try {
      authService.logout();
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
      setCurrentUser(undefined);
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      const roles = user.role || [];
      setCurrentUser(user.username);
      setShowModeratorBoard(roles.includes("MOD"));
      setShowAdminBoard(roles.includes("ADMIN"));
    }
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "black",
          color: "white",
          padding: "13px",
          zIndex: 1000,
        }}
      >
        <Row>
          <Col flex={1}></Col>
          <Col flex={2} style={{ marginLeft: "80px" }}>
            <Flex align="center" gap="large">
              <div style={{ marginRight: "10px" }}>
                <Link to={"/home"} className="navbar-brand">
                  <img
                    src={"/swp391-high-resolution-logo-white-transparent.png"}
                    style={{ width: "auto", height: "50px" }}
                  />
                </Link>
              </div>

              <Link to={"/home"} className="nav-link2">
                Trang Chủ
              </Link>

              <Link to={"/homecontent"} className="nav-link2">
                Dự Án
              </Link>

              <Link to={"/news"} className="nav-link2">
                Tin Tức
              </Link>

              <Link to={"/quoteCustomer"} className="nav-link2">
                Yêu Cầu Báo Giá
              </Link>
            </Flex>
          </Col>
          <Col flex={1} style={{ marginRight: "30px" }}>
            <Flex justify="flex-end">
              <div>
                {currentUser ? (
                  <div>
                    <li className="nav-item">
                      <Link className="nav-link">
                        {currentUser}{" "}
                        <span style={{ fontSize: "0.65em" }} onClick={logOut}>
                          Đăng Xuất
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {(showModeratorBoard || showAdminBoard) && (
                        <Link className="nav-item" to={"/admin"}>
                          Trang Admin
                        </Link>
                      )}
                    </li>
                  </div>
                ) : (
                  <div>
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Đăng nhập
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Đăng kí
                      </Link>
                    </li>
                  </div>
                )}
              </div>
            </Flex>
          </Col>
          <Col flex={1}></Col>
        </Row>
      </div>
    </>
  );
};

export default HomeHeader;
