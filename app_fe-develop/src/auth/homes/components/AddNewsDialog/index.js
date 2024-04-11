import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Input, Alert } from "antd";
import { storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import authService from "../../../services/auth.service";

const { TextArea } = Input;

export default function AddNewsDialog({ closeModal }) {
  const [disable, setDisable] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsWrittenBy, setNewsWrittenBy] = useState("");
  const [newsBody, setNewsBody] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [titleExceeded, setTitleExceeded] = useState(false);
  const [bodyExceeded, setBodyExceeded] = useState(false);

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

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user.username);
      setNewsWrittenBy(user.username);
    }
  }, []);

  async function saveNews() {
    if (!newsTitle || !imgUrl || !newsWrittenBy || !newsBody) {
      setAlertVisible(true);
      return;
    }

    if (newsTitle.length > 100) {
      setTitleExceeded(true);
      return;
    }

    if (newsBody.length > 10000) {
      setBodyExceeded(true);
      return;
    }

    setDisable(true);
    await axios.post("http://localhost:8080/api/news/save", {
      title: newsTitle,
      imageUrl: imgUrl,
      writtenBy: newsWrittenBy,
      body: newsBody,
    });
    window.location.reload();
    setDisable(false);
  }

  return (
    <Modal
      open={disable}
      title="Thêm tin tức"
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>
          Trở về
        </Button>,
        <Button key="save" onClick={saveNews}>
          Lưu
        </Button>,
      ]}
    >
      {alertVisible && (
        <Alert
          message="Thiếu thông tin"
          description="Vui lòng thêm tất cả chi tiết cần thiết"
          type="warning"
          onClose={() => setAlertVisible(false)}
          closable
          showIcon
        />
      )}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="inputField">
          <div className="label">
            <label>Tên Tin Tức</label>
          </div>
          <div>
            <Input
              id="newsTitle"
              type="text"
              value={newsTitle}
              onChange={(e) => {
                if (e.target.value.length <= 101) {
                  setNewsTitle(e.target.value);
                  setTitleExceeded(false);
                } else {
                  setTitleExceeded(true);
                }
              }}
            />
            {titleExceeded && (
              <div style={{ color: "red" }}>
                Kí tự vượt quá giới hạn 100 kí tự
              </div>
            )}
          </div>
        </div>
        <div style={{ margin: "10px 7px", width: "100%" }}>
          Thêm hình ảnh
          <form className="form">
            <input type="file" onChange={handleFileChange} />
          </form>
          {!imgUrl && <div className="innerbar">{progresspercent}%</div>}
          {imgUrl && (
            <img
              id="newsImageUrl"
              src={imgUrl}
              alt="uploaded file"
              height={200}
            />
          )}
        </div>
        <div className="inputField">
          <div className="label">
            <label>Viết bởi</label>
          </div>
          <div>
            <Input
              id="newsWrittenBy"
              type="text"
              value={currentUser}
              readOnly
            />
          </div>
        </div>
        <div className="inputField" style={{ flex: "2 1 100%" }}>
          <div className="label">
            <label>Nội dung</label>
          </div>
          <div>
            <TextArea
              value={newsBody}
              onChange={(e) => {
                if (e.target.value.length <= 10001) {
                  setNewsBody(e.target.value);
                  setBodyExceeded(false);
                } else {
                  setBodyExceeded(true);
                }
              }}
              style={{
                width: "100%",
                height: "200px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
              }}
            />
            {bodyExceeded && (
              <div style={{ color: "red" }}>
                Số kí tự vượt quá giới hạn 10000 kí tự
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
