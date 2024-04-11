import React from "react";
import { Link } from "react-router-dom";
import { Image, Card, Flex } from "antd";

const ProjectCard = ({ projectItems }) => {
  const { title, architect, area, year, imageUrl, id } = projectItems;
  return (
    <Card
      cover={
        <Image
          src={imageUrl}
          style={{ objectFit: "cover", width: "511px", height: "390px" }}
          preview={false}
        />
      }
      style={{ boxShadow: "none" }}
    >
      <div>
        <Link to={"/projectview/" + id}>
          <div className="newscardtitle">
            <h1>{title}</h1>
          </div>
        </Link>
        <div>
          <Flex vertical>
            Kiến trúc sư: {architect}
            <div>Diện tích: {area} m2</div>
            Năm xây dựng: {year}
          </Flex>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
