import { Row, Col, Flex } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

const HomeFooter = () => {
  return (
    <footer
      style={{
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        padding: "70px",
      }}
    >
      <Row>
        <Col span={4}></Col>
        <Col span={4}>
          <img
            src={"/swp391-high-resolution-logo-white-transparent.png"}
            style={{ width: "auto", height: "35px" }}
          />
        </Col>
        <Col span={5}>
          <Flex vertical gap="large" align="flex-start">
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
        <Col span={5}>
          <Flex vertical gap="small" align="flex-start">
            <p style={{ fontSize: "15px" }}>Làm bởi</p>
            <p style={{ fontSize: "20px" }}>Nhóm 1</p>
          </Flex>
        </Col>
        <Col span={5}>
          <Flex vertical gap="large" align="flex-start">
            <p style={{ fontSize: "25px" }}>Thông tin liên hệ</p>
            <div>
              <Flex gap="small">
                <PhoneOutlined /> <p style={{ fontSize: "15px" }}>0907560789</p>
              </Flex>
            </div>
            <div>
              <Flex gap="small">
                <MailOutlined />
                <p style={{ fontSize: "15px" }}>triptmse172500@fpt.edu.vn</p>
              </Flex>
            </div>
          </Flex>
        </Col>
      </Row>
    </footer>
  );
};

export default HomeFooter;
