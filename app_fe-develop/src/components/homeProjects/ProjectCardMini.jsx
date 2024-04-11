import React from "react";
import { Link } from "react-router-dom";
import { Flex, Image } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

const ProjectCardMini = ({ projectItems2 }) => {
  const { title, imageUrl, id } = projectItems2;
  return (
    <Flex>
      <div>
        <Image
          src={imageUrl}
          preview={false}
          style={{ width: "110px", height: "110px" }}
        />
      </div>
      <Link to={"/projectview/" + id}>
        <Title level={5} style={{ paddingLeft: "15px" }}>
          {title}
        </Title>
      </Link>
    </Flex>
  );
};

export default ProjectCardMini;
