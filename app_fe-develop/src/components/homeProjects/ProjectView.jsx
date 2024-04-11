import { Col, Flex, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "../../auth/services/auth.service";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

const ProjectView = () => {
  let { id } = useParams();
  const [project, setProject] = useState({});
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  useEffect(() => {
    async function getProject() {
      try {
        const data = await axios.post(
          "http://localhost:8080/api/projects/getOne",
          { id }
        );
        setProject(data?.data);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          window.location.href = "/home";
        } else {
          console.error("Error fetching project:", error);
        }
      }
    }
    getProject();
  }, []);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      const roles = user.role || [];
      setShowModeratorBoard(roles.includes("MOD"));
      setShowAdminBoard(roles.includes("ADMIN"));
    }
  }, []);

  async function deleteProject() {
    if (window.confirm("Bạn chắc chắn muốn xoá dự án?")) {
      await axios.post("http://localhost:8080/api/projects/delete", { id });
      window.history.pushState(null, "", "/admin");
      window.location.reload();
    }
  }

  const displayProjectBody = () => {
    if (project && project.body) {
      return project.body.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
    } else {
      return null;
    }
  };

  return (
    <>
      <HomeHeader />
      <div>
        <Row style={{ paddingBottom: "40px" }}>
          <Col span={5}></Col>
          <Col span={14} style={{ marginTop: "60px" }}>
            <div className="newsviewtitle">
              <h1>{project.title}</h1>
            </div>
            <Row>
              <Col spam={10}>
                <img
                  src={project.imageUrl}
                  style={{
                    width: "550px",
                    height: "390px",
                  }}
                />
              </Col>
              <Col spam={10} style={{ marginLeft: "15px" }}>
                <div>
                  <Flex vertical>
                    <div style={{ fontSize: "18px" }}>
                      Kiến trúc sư: {project.architect}
                    </div>
                    <div style={{ fontSize: "18px" }}>
                      Diện tích: {project.area} m2
                    </div>
                    <div style={{ fontSize: "18px" }}>
                      Năm xây dựng: {project.year}
                    </div>
                  </Flex>
                </div>
              </Col>
            </Row>

            <div className="newsviewbody" style={{ marginTop: "15px" }}>
              {project.body}
              {displayProjectBody()}
            </div>

            {(showModeratorBoard || showAdminBoard) && (
              <button className="btn-danger" onClick={deleteProject}>
                Xoá
              </button>
            )}
          </Col>
          <Col span={5}></Col>
        </Row>
      </div>
      <HomeFooter />
    </>
  );
};

export default ProjectView;
