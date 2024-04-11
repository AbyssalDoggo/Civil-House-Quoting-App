import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table, Modal } from "antd";
import { v4 as uuid } from "uuid";

import { storage } from "../auth/homes/components/AddNewsDialog/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log(errInfo);
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
const PackageDetail = ({ onSave, packageDetailData, parentKey }) => {
    const [dataSource, setDataSource] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL);
                });
            }
        );
    };

    const handleClick = () => {
        setShowModal(!showModal);
    };

    const handleCancel = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        if (packageDetailData) {
            setDataSource(
                packageDetailData.map((item) => ({
                    ...item,
                    key: item.detailNo,
                    parentKey,
                }))
            );
        }
    }, [packageDetailData, parentKey]);

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        onSave(newData);
    };

    const defaultColumns = [
        {
            title: "STT",
            dataIndex: "detailNo",
            width: "10%",
            editable: true,
        },
        {
            title: "Tên",
            dataIndex: "packageDetailName",
            editable: true,
            width: "12%",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            width: "20%",
            render: (text) => <img src={text} style={{ width: "100%", height: "130px" }} />,
        },
        {
            title: "Chi tiết",
            dataIndex: "detail",
            editable: true,
        },
        {
            title: "",
            dataIndex: "operation",
            width: "5%",
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm
                        title="Bạn có chắc muốn xóa không?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Có"
                        cancelText="Không"
                        okButtonProps={{ style: { color: "red" }, border: "none" }}
                        cancelButtonProps={{ style: { color: "grey", border: "none" } }}
                    >
                        <a>Xóa</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    useEffect(() => {
        if (imgUrl) {
            setShowModal(false);
            handleAdd();
        }
    }, [imgUrl]);

    const handleAdd = () => {
        const newKey = uuid();
        const latestIndex = dataSource.length - 1;
        let count = 1; // Initialize count here
        if (dataSource.length > 0) {
            count = parseInt(dataSource[latestIndex].detailNo) + 1;
        }

        const newData = {
            parentKey: parentKey,
            key: newKey,
            detailNo: count,
            packageDetailName: "Tên vật tư",
            image: imgUrl,
            detail: `Chi tiết vật tư`,
        };
        const updatedDataSource = [...dataSource, newData];
        setDataSource(updatedDataSource);
        onSave(updatedDataSource);
        setImgUrl();
    };

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...row,
            });
            setDataSource(newData);
            onSave(newData);
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
    return (
        <div>
            <Button
                onClick={handleClick}
                style={{
                    marginBottom: 16,
                }}
            >
                Thêm vật tư
            </Button>
            <Table
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
            <Modal
                title="Thêm hình ảnh"
                open={showModal}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { color: "grey", border: "none" } }}
            >
                <form className="form">
                    <input type="file" onChange={handleFileChange} />
                </form>
                {!imgUrl && <div>{progresspercent}%</div>}
                {imgUrl && <img id="imageUrl" src={imgUrl} alt="uploaded file" height={200} />}
            </Modal>
        </div>
    );
};
export default PackageDetail;
