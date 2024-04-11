import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { v4 as uuid } from "uuid";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  handleSave2,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      if (dataIndex === "typeDetailName" || dataIndex === "coefficient") {
        handleSave2({
          ...record,
          ...values,
        });
      } else {
        handleSave({
          ...record,
          ...values,
        });
      }
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Cần điền ${title}`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const PackageType = ({
  onSave,
  onSave2,
  packageTypeData,
  packageTypeDetailData,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [counters, setCounters] = useState({});

  useEffect(() => {
    fetchData();
    fetchData2();
  }, [packageTypeData, packageTypeDetailData]);

  const fetchData = () => {
    if (packageTypeData) {
      const mappedData = packageTypeData.map((item) => ({
        ...item,
        key: item.detailNo,
      }));
      setDataSource(mappedData);
    }
  };

  const fetchData2 = () => {
    if (packageTypeDetailData && typeof packageTypeDetailData === "object") {
      const arraysOfDetails = Object.values(packageTypeDetailData);

      const allDetails = arraysOfDetails.reduce(
        (acc, arr) => acc.concat(arr),
        []
      );

      const mappedData2 = allDetails.map((detail) => ({
        ...detail,
        key: detail.detailNo,
        detailNo2: detail.detailNo,
      }));

      setDataSource2(mappedData2);
    } else {
      console.error(
        "packageTypeDetailData is not in the expected object format:",
        packageTypeDetailData
      );
    }
  };

  const handleAdd2 = (parentKey) => {
    const newKey = uuid();
    const currentCount2 = counters[parentKey] || 1;
    const newData2 = {
      typeKey: newKey,
      parentKey: parentKey,
      detailNo: `${currentCount2}`,
      detailNo2: `${currentCount2}`,
      typeDetailName: "Loại mục",
      coefficient: "Hệ số",
    };
    const updatedDataSource2 = [...dataSource2, newData2];
    setDataSource2(updatedDataSource2);
    setCounters((prevCounters) => ({
      ...prevCounters,
      [parentKey]: currentCount2 + 1,
    }));
    onSave2(updatedDataSource2);
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.tKey !== key);
    setDataSource(newData);
    onSave(newData);
  };

  const handleDelete2 = (key) => {
    const newData = dataSource2.filter((item) => item.typeKey !== key);
    setDataSource2(newData);
    onSave2(newData);
  };

  const defaultColumns = [
    {
      title: "STT",
      dataIndex: "detailNo",
      width: "11%",
      editable: true,
      // sorter: (a, b) => a.detailNo - b.detailNo,
      // defaultSortOrder: "ascend",
      // sortDirections: ["ascend"],
    },
    {
      title: "Tên",
      dataIndex: "packageTypeName",
      editable: true,
    },
    {
      title: "",
      dataIndex: "operation",
      width: "8%",
      render: (_, record) => (
        <Button
          key="add"
          style={{ border: "none" }}
          onClick={() => handleAdd2(record.detailNo)}
        >
          Thêm
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "operation2",
      width: "8%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {dataSource.length >= 1 ? (
              <Popconfirm
                title="Bạn có chắc muốn xóa không?"
                onConfirm={() => handleDelete(record.tKey)}
                okText="Có"
                cancelText="Không"
                okButtonProps={{ style: { color: "red" }, border: "none" }}
                cancelButtonProps={{ style: { color: "grey", border: "none" } }}
              >
                <div>Xóa</div>
              </Popconfirm>
            ) : null}
          </div>
        ) : null,
    },
  ];

  const defaultColumns2 = [
    {
      title: "STT Mục",
      dataIndex: "detailNo2",
      width: "11%",
      editable: true,
    },
    {
      title: "Loại",
      dataIndex: "typeDetailName",
      key: "typeDetailName",
      editable: true,
    },
    {
      title: "Hệ số",
      dataIndex: "coefficient",
      key: "coefficient",
      editable: true,
    },
    {
      title: "",
      dataIndex: "operation2",
      width: "8%",
      render: (_, record) =>
        dataSource2.length >= 1 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {dataSource2.length >= 1 ? (
              <Popconfirm
                title="Bạn có chắc muốn xóa không?"
                onConfirm={() => handleDelete2(record.typeKey)}
                okText="Có"
                cancelText="Không"
                okButtonProps={{ style: { color: "red" }, border: "none" }}
                cancelButtonProps={{ style: { color: "grey", border: "none" } }}
              >
                <div>Xóa</div>
              </Popconfirm>
            ) : null}
          </div>
        ) : null,
    },
  ];

  const handleAdd = () => {
    if (dataSource.length > 0) {
      const latestItem = dataSource[dataSource.length - 1];
      const latestDetailNo = latestItem.detailNo;
      const maxDetailNo = Math.max(...dataSource.map((item) => item.detailNo));
      const newDetailNo = Math.max(latestDetailNo, maxDetailNo) + 1;
      const newKey = uuid();
      const newData = {
        tKey: newKey,
        detailNo: newDetailNo,
        packageTypeName: "Tên mục",
        packageTypeDetail: [{}],
      };
      const updatedDataSource = [...dataSource, newData];
      setDataSource(updatedDataSource);
      onSave(updatedDataSource);
    } else {
      const newKey = uuid();
      const newData = {
        tKey: newKey,
        detailNo: "1",
        packageTypeName: "Tên mục",
        packageTypeDetail: [{}],
      };
      const updatedDataSource = [...dataSource, newData];
      setDataSource(updatedDataSource);
      onSave(updatedDataSource);
    }
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.tKey === item.tKey);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    onSave(newData);
  };

  const handleSave2 = (row) => {
    const newData = [...dataSource2];
    const index = newData.findIndex(
      (item) => row.typeKey === item.typeKey && row.parentKey === item.parentKey
    );
    if (index !== -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setDataSource2(newData);
      onSave2(newData);
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const columns2 = defaultColumns2.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave2,
      }),
    };
  });

  const sortedDataSource2 = [...dataSource2].sort(
    (a, b) => a.detailNo2 - b.detailNo2
  );

  const expandedRowRender = (record) => {
    return (
      <Table
        bordered
        components={components}
        rowClassName={() => "editable-row"}
        columns={columns2}
        dataSource={sortedDataSource2.filter(
          (item) => item.parentKey === record.key
        )}
        pagination={false}
      />
    );
  };

  const sortedDataSource = [...dataSource].sort(
    (a, b) => a.detailNo - b.detailNo
  );

  return (
    <div>
      <Button
        onClick={handleAdd}
        style={{
          marginBottom: 16,
        }}
      >
        Thêm hạng mục
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={sortedDataSource}
        expandable={{
          expandedRowRender,
        }}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};
export default PackageType;
