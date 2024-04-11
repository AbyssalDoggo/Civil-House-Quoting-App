import { Link } from "react-router-dom";
import { Card } from "antd";

const { Meta } = Card;

const HomeNews = ({ newsItem }) => {
  const { title, body, imageUrl, id } = newsItem;
  const synopsis = body.slice(0, 400);
  return (
    <Card
      style={{ width: "300px", minHeight: "100px" }}
      cover={
        <img
          alt={title}
          src={imageUrl}
          style={{ width: "100%", height: "200px" }}
        />
      }
    >
      <Meta title={title} description={synopsis} />
      <div style={{ marginTop: "15px" }}>
        <Link to={"/newsview/" + id}>Xem thêm</Link>
      </div>
    </Card>
  );
};

export default HomeNews;
