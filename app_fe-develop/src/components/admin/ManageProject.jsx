import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddProject from "../homeProjects/AddProject";
import axios from "axios";
import { Button, Table, Typography } from "antd";
const { Title } = Typography;

const ManageProject = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectList, setProjectList] = useState([]);

  function showAddProjectDialog() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchNews() {
      const data = await axios.post("http://localhost:8080/api/projects/get");
      setProjectList([...data?.data]);
    }
    fetchNews();
  }, []);

  const defaultColumns = [
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      width: "30%",
      render: (text) => (
        <img
          src={text}
          alt="Hình ảnh"
          style={{ width: "400px", height: "250px" }}
        />
      ),
    },
    {
      title: "Tên dự án",
      dataIndex: "title",
    },
    {
      title: "",
      dataIndex: "id",
      width: "5%",
      render: (text) => (
        <Link to={"/projectview/" + text}>
          <button>Edit</button>
        </Link>
      ),
    },
  ];

  return (
    <>
      <div>
        <Title level={4} style={{ fontWeight: "bold" }}>
          QUẢN LÝ DỰ ÁN
        </Title>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <div></div>
          <Button onClick={showAddProjectDialog}>Thêm dự án</Button>
        </div>
        <div>
          <Table
            bordered
            dataSource={projectList}
            columns={defaultColumns}
            pagination={false}
          />
        </div>
      </div>
      {showModal ? <AddProject closeModal={showAddProjectDialog} /> : null}
    </>
  );
};

export default ManageProject;
