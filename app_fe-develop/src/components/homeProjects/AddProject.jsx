import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Input, Alert } from "antd";
import { storage } from "../../auth/homes/components/AddNewsDialog/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const { TextArea } = Input;

const AddProject = ({ closeModal }) => {
  const [disable, setDisable] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [projectBody, setProjectBody] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectArchitect, setProjectArchitect] = useState("");
  const [projectArea, setProjectArea] = useState("");
  const [projectYear, setProjectYear] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [characterExceeded, setCharacterExceeded] = useState(false);
  const [characterExceeded2, setCharacterExceeded2] = useState(false);
  const [areaError, setAreaError] = useState(false);
  const [yearError, setYearError] = useState(false);
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

  async function saveProjects() {
    if (
      !projectTitle ||
      !imgUrl ||
      !projectArchitect ||
      !projectArea ||
      !projectYear ||
      !projectBody
    ) {
      setAlertVisible(true);
      return;
    }

    if (projectTitle.length > 100) {
      setCharacterExceeded(true);
      return;
    }

    if (projectArchitect.length > 50) {
      setCharacterExceeded2(true);
      return;
    }

    if (projectBody.length > 10000) {
      setBodyExceeded(true);
      return;
    }

    if (isNaN(projectArea) || projectArea.length > 10) {
      setAreaError(true);
      return;
    }

    if (isNaN(projectYear) || projectYear.length > 4) {
      setYearError(true);
      return;
    }

    setDisable(true);
    await axios.post("http://localhost:8080/api/projects/save", {
      title: projectTitle,
      imageUrl: imgUrl,
      architect: projectArchitect,
      area: projectArea,
      year: projectYear,
      body: projectBody,
    });
    window.location.reload();
    setDisable(false);
  }

  return (
    <Modal
      open={disable}
      title="Thêm dự án"
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>
          Trở về
        </Button>,
        <Button key="save" onClick={saveProjects}>
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
            <label>Tên dự án</label>
          </div>
          <div>
            <Input
              id="projectTitle"
              type="text"
              value={projectTitle}
              onChange={(e) => {
                if (e.target.value.length <= 101) {
                  setProjectTitle(e.target.value);
                  setCharacterExceeded(false);
                } else {
                  setCharacterExceeded(true);
                }
              }}
            />
            {characterExceeded && (
              <div style={{ color: "red" }}>Vượt quá giới hạn 100 kí tự</div>
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
        <div className="inputField" style={{ flex: "2 1 100%" }}>
          <div className="label">
            <label>Thực hiện bởi</label>
          </div>
          <div>
            <Input
              id="projectArchitect"
              type="text"
              value={projectArchitect}
              onChange={(e) => {
                if (e.target.value.length <= 51) {
                  setProjectArchitect(e.target.value);
                  setCharacterExceeded2(false);
                } else {
                  setCharacterExceeded2(true);
                }
              }}
            />
            {characterExceeded2 && (
              <div style={{ color: "red" }}>Vượt quá giới hạn 50 kí tự</div>
            )}
          </div>
        </div>
        <div className="inputField">
          <div className="label">
            <label>Diện tích</label>
          </div>
          <div>
            <Input
              id="projectArea"
              type="text"
              value={projectArea}
              onChange={(e) => {
                if (!isNaN(e.target.value) && e.target.value.length <= 11) {
                  setProjectArea(e.target.value);
                  setAreaError(false);
                } else {
                  setAreaError(true);
                }
              }}
            />
            {areaError && (
              <div style={{ color: "red" }}>
                Diện tích phải là một số không vượt quá 10 chữ số
              </div>
            )}
          </div>
        </div>
        <div className="inputField">
          <div className="label">
            <label>Năm</label>
          </div>
          <div>
            <Input
              id="projectYear"
              type="text"
              value={projectYear}
              onChange={(e) => {
                if (!isNaN(e.target.value) && e.target.value.length <= 5) {
                  setProjectYear(e.target.value);
                  setYearError(false);
                } else {
                  setYearError(true);
                }
              }}
            />
            {yearError && (
              <div style={{ color: "red" }}>
                Năm xây dựng phải là một năm hợp lệ
              </div>
            )}
          </div>
        </div>
        <div className="inputField" style={{ flex: "2 1 100%" }}>
          <div className="label">
            <label>Nội dung</label>
          </div>
          <div>
            <TextArea
              value={projectBody}
              onChange={(e) => {
                if (e.target.value.length <= 10000) {
                  setProjectBody(e.target.value);
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
};

export default AddProject;
