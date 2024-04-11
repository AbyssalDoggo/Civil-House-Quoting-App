import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Space, Carousel, Typography } from "antd";

import ProjectCard from "./ProjectCard";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

const { Title } = Typography;

const projectItems3 = [
  {
    imageUrl:
      "https://images.adsttc.com/media/images/65e7/71b4/da34/c701/7c51/cabe/slideshow/the-gallery-house-wim-goes-architectuur_2.jpg?1709666804",
    id: 1,
  },
  {
    imageUrl:
      "https://images.adsttc.com/media/images/65e6/199a/d898/3c46/b758/f66e/slideshow/casa-a-beiramar-metropole-architects_2.jpg?1709578664",
    id: 2,
  },
  {
    imageUrl:
      "https://images.adsttc.com/media/images/65ea/5b81/855b/f264/9e6f/8177/slideshow/casa-las-brisas-abarca-palma-arquitectos_17.jpg?1709857718",
    id: 3,
  },
  {
    imageUrl:
      "https://images.adsttc.com/media/images/65e9/dd4b/855b/f264/9e6f/7e11/slideshow/de-hue-space-studio-voi_3.jpg?1709825393",
    id: 4,
  },
];

const HomeContent = () => {
  const [projectItems, setProjectItems] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const data = await axios.post("http://localhost:8080/api/projects/get");
      setProjectItems([...data?.data]);
    }
    fetchNews();
  }, []);

  return (
    <>
      <HomeHeader />
      <div style={{ marginTop: "75px" }}>
        <Row>
          <Col span={5}>=</Col>
          <Col span={14}>
            <Carousel autoplay dots={false}>
              {projectItems3.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.imageUrl}
                    alt={`Project ${item.id}`}
                    style={{ width: "100%", height: "450px" }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>
          <Col span={5}></Col>
        </Row>
      </div>
      <Row style={{ marginBottom: "50px", marginTop: "20px" }}>
        <Col span={5}>=</Col>
        <Col span={14}>
          <Title
            level={4}
            style={{ fontWeight: "bold", paddingBottom: "10px" }}
          >
            CÔNG TRÌNH CỦA CHÚNG TÔI
          </Title>
          <Space size="large" style={{ display: "flex" }} wrap>
            {projectItems?.map((newItems, i) => (
              <ProjectCard projectItems={newItems} key={i} />
            ))}
          </Space>
        </Col>
        <Col span={5}></Col>
      </Row>
      <HomeFooter />
    </>
  );
};

export default HomeContent;
