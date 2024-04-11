import React, { useEffect, useState } from "react";
import { Row, Col, Space, Typography, Flex } from "antd";
import axios from "axios";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import HomeNews from "./HomeNews";
import HomeProjects from "./HomeProjects";

const Home = () => {
  const [newsList, setNewsList] = useState([]);
  const [projectItems, setProjectItems] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const data = await axios.post("http://localhost:8080/api/projects/get");
      setProjectItems([...data?.data]);
    }
    fetchNews();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      const data = await axios.post("http://localhost:8080/api/news/get");
      setNewsList([...data?.data]);
    }
    fetchNews();
  }, []);

  return (
    <>
      <HomeHeader />
      <div>
        <Row style={{ marginBottom: "50px", marginTop: "150px" }}>
          <Col span={4}></Col>
          <Col span={18}>
            <Flex align="center" style={{ marginBottom: "40px" }}>
              <Space
                direction="vertical"
                style={{ width: "50%" }}
                size="middle"
              >
                <p style={{ color: "crimson", fontSize: "16px" }}>
                  WEBSITE BÁO GIÁ THÔ CHUẨN
                </p>
                <p
                  style={{
                    fontSize: "50px",
                    fontStyle: "italic",
                    fontWeight: "bold",
                  }}
                >
                  Nền tảng quản lý xây dựng thích ứng nhất
                </p>
                <p
                  style={{
                    fontSize: "25px",
                  }}
                >
                  Theo dõi hiệu suất của bạn trên trang tổng quan thời gian
                  thực, tạo báo cáo và xây dựng quy trình. Từ quản lý nhà thầu
                  và tài chính đến lập dự toán và tiến độ
                </p>
                <div>
                  <a
                    href="/quoteCustomer"
                    style={{
                      display: "inline-block",
                      backgroundColor: "crimson",
                      color: "white",
                      padding: "10px 20px",
                      textDecoration: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Tạo báo giá
                  </a>
                </div>
              </Space>
              <img
                src={"/home-image-1.png"}
                style={{ width: "600px", height: "400px" }}
              />
            </Flex>
            <p
              style={{
                fontSize: "25px",
              }}
            >
              Tin tưởng bởi
            </p>
            <Flex>
              <img
                src={"/mitie-logo-2.png"}
                style={{ width: "204px", height: "auto" }}
              />
              <img
                src={"/maclennan.png"}
                style={{ width: "204px", height: "auto" }}
              />
              <img
                src={"/wolffkran.png"}
                style={{ width: "204px", height: "auto" }}
              />
              <img
                src={"/conditioned.png"}
                style={{ width: "204px", height: "auto" }}
              />
              <img
                src={"/vinci-3.png"}
                style={{ width: "204px", height: "auto" }}
              />
              <img
                src={"/halliday-lighting.png"}
                style={{ width: "204px", height: "auto" }}
              />
            </Flex>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
      <div
        style={{
          width: "100%",
          height: "500px",
          backgroundColor: "rgb(43, 41, 41)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Flex vertical style={{ width: "100%" }}>
            <p
              style={{
                fontSize: "29px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              CHUYỆN NHÀ
            </p>
            <p
              style={{
                fontSize: "15px",
                color: "white",
              }}
            >
              Những dự án được yêu thích
            </p>
          </Flex>
        </div>
        <div style={{ height: "100%", marginLeft: "100px" }}>
          {projectItems?.slice(0, 3).map((item, i) => (
            <HomeProjects projectItems={item} key={i} />
          ))}
        </div>
      </div>

      <div
        style={{
          paddingBottom: "100px",
          paddingTop: "100px",
        }}
      >
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <Flex justify="space-between" width="auto" align="center">
              <Flex
                vertical
                style={{ width: "18%" }}
                justify="center"
                align="center"
              >
                <p
                  style={{
                    fontSize: "29px",
                    fontWeight: "bold",
                  }}
                >
                  TIN TỨC
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    textAlign: "center",
                  }}
                >
                  Cập nhật những thông tin mới nhất
                </p>
              </Flex>
              <Flex gap="large">
                {newsList?.slice(0, 3).map((newsItem, i) => (
                  <HomeNews newsItem={newsItem} key={i} />
                ))}
              </Flex>
            </Flex>
          </Col>
          <Col span={4}></Col>
        </Row>
      </div>
      <HomeFooter />
    </>
  );
};

export default Home;
