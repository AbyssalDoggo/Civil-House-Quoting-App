import React, { useEffect, useState } from "react";
import { Table } from "antd";

const PackageDetailHome = ({ packageDetailData }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (packageDetailData) {
      setDataSource(
        packageDetailData.map((item) => {
          return {
            ...item,
            key: item.detailNo, // Change id to key
          };
        })
      );
    }
  }, [packageDetailData]);

  const defaultColumns = [
    {
      title: "STT",
      dataIndex: "detailNo",
      width: "10%",
    },
    {
      title: "Tên",
      dataIndex: "packageDetailName",
      width: "12%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      width: "20%",
      render: (text) => (
        <img
          src={text}
          alt="Hình ảnh"
          style={{ width: "300px", height: "130px" }}
        />
      ),
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
    },
  ];
  return (
    <div>
      <Table
        bordered
        dataSource={dataSource}
        columns={defaultColumns}
        pagination={false}
      />
    </div>
  );
};
export default PackageDetailHome;
