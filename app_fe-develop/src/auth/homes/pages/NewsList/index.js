import "./NewsList.css";
import NewsCard from "./../../components/NewsCard";
import { useEffect, useState } from "react";
import axios from "axios";
import AddNewsDialog from "../../components/AddNewsDialog";
import { Row, Col, Typography } from "antd";
import authService from "../../../services/auth.service";
import HomeHeader from "../../../../components/homeProjects/HomeHeader";
import HomeFooter from "../../../../components/homeProjects/HomeFooter";
const { Title } = Typography;

export default function NewsList() {
  const [newsList, setNewsList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      const data = await axios.post("http://localhost:8080/api/news/get");
      setNewsList([...data?.data]);
    }
    fetchNews();
  }, []);

  function showAddNewsDialog() {
    setShowModal(!showModal);
  }

  return (
    <>
      <HomeHeader />
      <div style={{ marginTop: "120px" }}>
        <Row style={{ marginBottom: "40px", marginTop: "20px" }}>
          <Col span={5}></Col>
          <Col span={14}>
            <Title
              level={4}
              style={{ fontWeight: "bold", paddingBottom: "10px" }}
            >
              TIN MỚI NHẤT
            </Title>
            <div>
              {newsList?.map((newsItem, i) => (
                <NewsCard newsItem={newsItem} key={i} />
              ))}
            </div>
            {showModal ? (
              <AddNewsDialog closeModal={showAddNewsDialog} />
            ) : null}
          </Col>
          <Col span={5}></Col>
        </Row>
      </div>
      <HomeFooter />
    </>
  );
}
