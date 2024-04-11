import { Button, Input, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
const { Title } = Typography;

const ManageQuotes = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [searchUserName, setSearchUserName] = useState("");
  const [searchUserPhoneNumber, setSearchUserPhoneNumber] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/quotes/get")
      .then((response) => {
        setQuotesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    { title: "Mã báo giá", dataIndex: "quotesId", key: "quotesId" },
    { title: "Tên", dataIndex: "userName", key: "userName" },
    { title: "SĐT", dataIndex: "userPhoneNumber", key: "userPhoneNumber" },
    {
      title: "Diện tích đất",
      dataIndex: "projectLandArea",
      key: "projectLandArea",
    },
    {
      title: "Diện tích xây dựng",
      dataIndex: "projectBuildArea",
      key: "projectBuildArea",
    },
    { title: "Số tầng", dataIndex: "projectFloor", key: "projectFloor" },
    { title: "Loại gói", dataIndex: "selectedPackage", key: "selectedPackage" },
    { title: "Đơn giá", dataIndex: "unitPrice", key: "unitPrice" },
    {
      title: "Tổng diện tích sàn",
      dataIndex: "totalFloorArea",
      key: "totalFloorArea",
    },
    { title: "Tổng tiền", dataIndex: "totalPrice", key: "totalPrice" },
    { title: "Ngày tạo", dataIndex: "createDatetime", key: "createDatetime" },
  ];

  const columns2 = [
    { title: "STT", dataIndex: "detailNo", key: "detailNo" },
    { title: "Hạng Mục", dataIndex: "category", key: "category" },
    {
      title: "Chi tiết hạng mục",
      dataIndex: "selectedCategory",
      key: "selectedCategory",
    },
    { title: "Hệ số", dataIndex: "coefficient", key: "coefficient" },
    { title: "Diện tích thi công", dataIndex: "buildArea", key: "buildArea" },
    { title: "Thành tiền", dataIndex: "cost", key: "cost" },
  ];

  const expandedRowRender = (record) => {
    if (!record.quotesDetail || record.quotesDetail.length === 0) {
      return null;
    }
    return (
      <Table
        columns={columns2}
        dataSource={record.quotesDetail}
        bordered
        pagination={false}
      />
    );
  };

  const filteredQuotesData = quotesData.filter(
    (item) =>
      item.userName.toLowerCase().includes(searchUserName.toLowerCase()) &&
      item.userPhoneNumber.includes(searchUserPhoneNumber)
  );

  const clearSearch = () => {
    setSearchUserName("");
    setSearchUserPhoneNumber("");
  };

  return (
    <>
      <Title level={4} style={{ fontWeight: "bold", marginBottom: "30px" }}>
        QUẢN LÝ DỰ ÁN
      </Title>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <Input
          placeholder="Tìm kiếm theo tên"
          value={searchUserName}
          onChange={(e) => setSearchUserName(e.target.value)}
          style={{ marginBottom: "20px", marginRight: "10px", width: "200px" }}
        />
        <Input
          placeholder="Tìm kiếm theo SĐT"
          value={searchUserPhoneNumber}
          onChange={(e) => setSearchUserPhoneNumber(e.target.value)}
          style={{ marginBottom: "20px", marginRight: "10px", width: "200px" }}
        />
        <Button
          type="primary"
          onClick={clearSearch}
          style={{
            marginBottom: "20px",
            height: "40px",
            backgroundColor: "red",
          }}
        >
          Clear
        </Button>
      </div>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={filteredQuotesData}
        bordered
        size="middle"
        pagination={false}
      />
    </>
  );
};

export default ManageQuotes;
