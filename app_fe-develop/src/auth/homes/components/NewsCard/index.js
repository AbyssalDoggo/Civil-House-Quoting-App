/* /newsapp/newsapp-strapi/src/components/NewsCard/index.js */

import { Link } from "react-router-dom";
import "./NewsCard.css";
import { Row, Col } from "antd";

export default function NewsCard({ newsItem }) {
  const { title, body, imageUrl, id } = newsItem;
  const synopsis = body.slice(0, 400);
  return (
    <Link to={"/newsview/" + id}>
      <Row style={{ marginTop: "15px" }}>
        <Col span={11}>
          <img
            src={imageUrl}
            style={{
              height: "300px",
              width: "700px",
            }}
          ></img>
        </Col>
        <Col span={12} style={{ marginLeft: "10px" }}>
          <div>
            <div className="newscardtitle">
              <h1>{title}</h1>
            </div>
            <div>
              <span>{synopsis}</span>
            </div>
            <div></div>
          </div>
        </Col>
      </Row>
    </Link>
  );
}
