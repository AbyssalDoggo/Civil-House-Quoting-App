import "./NewsView.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import authService from "../../../services/auth.service";
import HomeHeader from "../../../../components/homeProjects/HomeHeader";
import HomeFooter from "../../../../components/homeProjects/HomeFooter";

export default function NewsView() {
  let { id } = useParams();
  const [news, setNews] = useState();
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  useEffect(() => {
    async function getNews() {
      try {
        const data = await axios.post("http://localhost:8080/api/news/getOne", {
          id,
        });
        setNews(data?.data);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          window.location.href = "/home";
        } else {
          console.error("Error fetching news:", error);
        }
      }
    }
    getNews();
  }, []);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      const roles = user.role || [];
      setShowModeratorBoard(roles.includes("MOD"));
      setShowAdminBoard(roles.includes("ADMIN"));
    }
  }, []);

  async function deleteNews() {
    if (window.confirm("Bạn chắc chắn muốn xoá bài viết?")) {
      await axios.post("http://localhost:8080/api/news/delete", { id });
      window.history.pushState(null, "", "/news");
      window.location.reload();
    }
  }

  const displayProjectBody = () => {
    if (news && news?.body) {
      return news?.body.split("\n").map((line, index) => (
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
      <Row style={{ paddingBottom: "80px" }}>
        <Col span={5}></Col>
        <Col span={14}>
          <div className="newsview">
            <div
              className="newsviewimg"
              style={{ backgroundImage: `url(${news?.imageUrl})` }}
            ></div>
            <div>
              <div className="newsviewtitlesection">
                <div className="newsviewtitle">
                  <h1>{news?.title}</h1>
                </div>
                <div className="newsviewdetails">
                  <span style={{ flex: "1", color: "rgb(99 98 98)" }}>
                    Viết bởi: <span>{news?.writtenBy}</span>
                  </span>
                  <span style={{ flex: "1", color: "rgb(99 98 98)" }}>
                    Ngày tạo: <span>{news?.createdAt}</span>
                  </span>
                </div>
              </div>
              <div className="newsviewbody">{displayProjectBody()}</div>

              <span>
                {(showModeratorBoard || showAdminBoard) && (
                  <button className="btn-danger" onClick={deleteNews}>
                    Xoá
                  </button>
                )}
              </span>
            </div>
          </div>
        </Col>
        <Col span={5}></Col>
      </Row>
      <HomeFooter />
    </>
  );
}
