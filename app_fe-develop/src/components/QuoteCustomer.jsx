import React, { useEffect, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Divider,
  Flex,
  Select,
  Input,
  Space,
  Button,
  message,
  InputNumber,
} from "antd";
import axios from "axios";
import CategorySlider from "./CategorySlider";
import PackageDetailHome from "./homeProjects/PackageDetailHome";
import HomeHeader from "./homeProjects/HomeHeader";
import HomeFooter from "./homeProjects/HomeFooter";
import {
  RetweetOutlined,
  BulbOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

function QuoteCustomer() {
  const [packageType, setPackageType] = useState([]);
  const [packageInfos, setPackageInfos] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [projectBuildArea, setProjectBuildArea] = useState("");
  const [projectLandArea, setProjectLandArea] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [packageDetail, setPackageDetail] = useState([]);
  const [projectFloor, setProjectFloor] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalPriceDataList, setTotalPriceDataList] = useState([]);
  const [handlePackageChangeCalled, setHandlePackageChangeCalled] =
    useState(false);
  const [toggledCategory, setToggledCategory] = useState([]);

  const [characterExceeded, setCharacterExceeded] = useState(false);
  const [characterExceeded2, setCharacterExceeded2] = useState(false);
  const [isNotNumber, setIsNotNumber] = useState(false);
  const [floorExceeded, setFloorExceeded] = useState(false);

  const [projectLandAreaExceeded, setProjectLandAreaExceeded] = useState(false);
  const [projectBuildAreaExceeded, setProjectBuildAreaExceeded] =
    useState(false);

  const [lowerThanLand, setLowerThanLand] = useState(false);

  const handlePackageChange = (selectedPackage) => {
    setSelectedPackage(selectedPackage);

    const selectedItem = packageInfos.find(
      (item) => item.packageName === selectedPackage
    );

    setSelectedPrice(selectedItem.packagePrice);
    setSelectedKey(selectedItem.key);
    setHandlePackageChangeCalled(true);
  };

  const handleTotalPriceChange = (data) => {
    setTotalPriceDataList((prevDataList) => [...prevDataList, data]);
  };

  const saveCurrentCategory = (data) => {
    setToggledCategory((prevDataList) => [...prevDataList, data]);
  };

  const handleTotalPriceDelete = (dataToDelete) => {
    setTotalPriceDataList((prevDataList) => {
      const indexToDelete = prevDataList.findIndex(
        (item) => item === dataToDelete
      );
      if (indexToDelete === -1) {
        return prevDataList;
      }
      return prevDataList.filter((item, index) => index !== indexToDelete);
    });
  };

  const deleteCurrentCategory = (dataToDelete) => {
    setToggledCategory((prevDataList) => {
      const indexToDelete = prevDataList.findIndex(
        (item) => item.categorySlider === dataToDelete.categorySlider
      );
      if (indexToDelete === -1) {
        return prevDataList;
      }
      return prevDataList.filter((item, index) => index !== indexToDelete);
    });
  };

  const saveQuoteCustomer = () => {
    let sendPrice;
    if (totalPrice) {
      sendPrice = projectBuildArea * projectFloor * selectedPrice + totalPrice;
    } else {
      sendPrice = projectBuildArea * projectFloor * selectedPrice;
    }

    if (
      !userName ||
      !userPhoneNumber ||
      !projectLandArea ||
      !projectBuildArea ||
      !projectFloor ||
      !selectedPackage
    ) {
      message.error("Xin vui lòng điền đầy đủ thông tin");
      return;
    }
    setIsNotNumber(false);
    setLowerThanLand(false);

    if (userName.length > 50) {
      setCharacterExceeded(true);
      return;
    }

    if (isNaN(Number(userPhoneNumber))) {
      setIsNotNumber(true);
      return;
    }

    if (userPhoneNumber.length > 12) {
      setCharacterExceeded2(true);
      return;
    }

    if (projectFloor > 100) {
      setFloorExceeded(true);
      return;
    }

    if (projectLandArea > 1000000000) {
      setProjectLandAreaExceeded(true);
      return;
    }

    if (projectBuildArea > projectLandArea) {
      setLowerThanLand(true);
      return;
    }

    if (projectBuildArea > 1000000000) {
      setProjectBuildAreaExceeded(true);
      return;
    }

    const combinedData = {
      userName: userName,
      userPhoneNumber: userPhoneNumber,
      projectLandArea: projectLandArea,
      projectBuildArea: projectBuildArea,
      projectFloor: projectFloor,
      selectedPackage: selectedPackage,
      unitPrice: selectedPrice,
      totalFloorArea: projectFloor * projectBuildArea,
      totalPrice: sendPrice,
      quotesDetail: toggledCategory,
    };

    axios
      .post("http://localhost:8080/api/quotes/save", {
        ...combinedData,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  };

  useEffect(() => {
    const total = totalPriceDataList.reduce((acc, item) => acc + item, 0);
    setTotalPrice(total);
  }, [totalPriceDataList]);

  const fetchData = () => {
    axios
      .post("http://localhost:8080/api/package/getPackage")
      .then((response) => {
        const fetchedData = response.data;

        const packageDtoList = fetchedData.packageDtoList;

        const mappedPackages = packageDtoList.map((item) => {
          const { id, packageName, packagePrice, packageDetail } = item;

          const updatedPackageDetail = packageDetail.map((detail) => ({
            ...detail,
            parentKey: id,
          }));

          setPackageDetail((prevPackageDetail) => ({
            ...prevPackageDetail,
            [id]: updatedPackageDetail,
          }));

          return {
            key: id,
            packageName,
            packagePrice,
            packageDetail,
          };
        });

        setPackageInfos(mappedPackages);
      })
      .catch((error) => {
        console.error("Error fetching data from backend:", error);
      });
  };

  const fetchData2 = () => {
    axios
      .post("http://localhost:8080/api/package/getPackageType")
      .then((response) => {
        const fetchedData = response.data;

        const packageTypeList = fetchedData.packageType;

        const mappedPackageType = packageTypeList.map((item) => {
          const { detailNo, packageTypeName, packageTypeDetail } = item;

          return {
            tKey: detailNo,
            detailNo,
            packageTypeName,
            packageTypeDetail,
          };
        });

        setPackageType(mappedPackageType);
      })
      .catch((error) => {
        console.error("Error fetching data from backend:", error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  return (
    <>
      <HomeHeader />
      <div style={{ position: "relative" }}>
        <img
          src={"/Obszar-kompozycji-2-2.png"}
          style={{ width: "100%", height: "550px", marginTop: "20px" }}
        />
        <div
          style={{
            position: "absolute",
            top: "150px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
          }}
        >
          <Row>
            <Col span={4}></Col>
            <Col span={18}>
              <Flex align="center" style={{ marginBottom: "40px" }}>
                <Space
                  direction="vertical"
                  style={{ width: "50%" }}
                  size="middle"
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    WEBSITE BÁO GIÁ THÔ CHUẨN
                  </p>
                  <p
                    style={{
                      fontSize: "50px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Hoàn thành việc tính giá vật liệu thô nhanh chóng
                  </p>
                  <p style={{ fontSize: "25px", color: "white" }}>
                    Giúp việc quản lý tài chính dự án của bạn trở nên đơn giản,
                    báo giá dự kiến chính xác
                  </p>
                </Space>
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgb(198, 198, 198)",
          height: "500px",
        }}
      >
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <div
              style={{
                backgroundColor: "white",
                padding: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "80px",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  fontSize: "25px",
                }}
              >
                BÁO GIÁ THI CÔNG NGAY HÔM NAY
              </p>
              <Flex gap={100} style={{ marginTop: "50px" }}>
                <div style={{ textAlign: "center", width: "300px" }}>
                  <RetweetOutlined
                    style={{ fontSize: "50px", marginBottom: "10px" }}
                  />
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Cải thiện quy hoạch
                  </p>
                  <p style={{ fontSize: "15px" }}>
                    Phối hợp không hiệu quả có thể gây ra các nhiệm vụ không đạt
                    tiêu chuẩn dẫn đến dự án thất bại
                  </p>
                </div>

                <div style={{ textAlign: "center", width: "300px" }}>
                  <BulbOutlined
                    style={{ fontSize: "50px", marginBottom: "10px" }}
                  />
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Tăng cường dòng tiền
                  </p>
                  <p style={{ fontSize: "15px" }}>
                    Ước tính chính xác hơn và giảm tổn thất về đấu thầu hoặc tài
                    chính để thực hiện nghĩa vụ của bạn
                  </p>
                </div>

                <div style={{ textAlign: "center", width: "300px" }}>
                  <BarChartOutlined
                    style={{ fontSize: "50px", marginBottom: "10px" }}
                  />
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Quản lý chính xác
                  </p>
                  <p style={{ fontSize: "15px" }}>
                    Dễ dàng nhận diện cái thông số tính toán. Cung cấp thông tin
                    chính xác, hiệu quả
                  </p>
                </div>
              </Flex>
            </div>
          </Col>
          <Col span={4}></Col>
        </Row>
      </div>
      <div style={{ padding: "120px" }}>
        <div style={{ maxWidth: "80%", margin: "0 auto", display: "grid" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              marginBottom: "10px",
            }}
          >
            <Title level={2} style={{ marginBottom: "20px" }}>
              Giá dự kiến sơ bộ
            </Title>
          </div>

          <Row gutter={8} style={{ flex: 1, marginBottom: "20px" }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Card
                bordered={true}
                style={{
                  padding: "20px",
                  minHeight: "100%",
                  border: "1px solid #d9d9d9",
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <Divider>Thông tin người dùng</Divider>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <Flex gap="small" vertical>
                      <span>Họ và tên: </span>
                      <Input
                        id="userName"
                        placeholder="Nhập tên"
                        style={{
                          width: "auto",
                          borderRadius: "10px",
                          padding: "10px",
                          outline: "none",
                        }}
                        value={userName}
                        onChange={(e) => {
                          if (e.target.value.length <= 51) {
                            setUserName(e.target.value);
                            setCharacterExceeded(false);
                          } else {
                            setCharacterExceeded(true);
                          }
                        }}
                      />
                      {characterExceeded && (
                        <div style={{ color: "red" }}>
                          Vượt quá giới hạn 50 kí tự
                        </div>
                      )}
                    </Flex>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <Flex gap="small" vertical>
                      <span>Số điện thoại: </span>
                      <Input
                        id="userPhoneNumber"
                        placeholder="Nhập số điện thoại"
                        style={{
                          width: "auto",
                          borderRadius: "10px",
                          padding: "10px",
                          outline: "none",
                        }}
                        value={userPhoneNumber}
                        onChange={(e) => {
                          if (e.target.value.length <= 13) {
                            setUserPhoneNumber(e.target.value);
                            setCharacterExceeded2(false);
                          } else {
                            setCharacterExceeded2(true);
                          }
                        }}
                      />
                      {characterExceeded2 && (
                        <div style={{ color: "red" }}>
                          Vượt quá giới hạn 12 số
                        </div>
                      )}
                      {isNotNumber && (
                        <div style={{ color: "red" }}>
                          Không phải là số điện thoại hợp lệ
                        </div>
                      )}
                    </Flex>
                  </div>

                  <div>
                    <Divider>Chi Tiết Dự Án</Divider>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <Flex gap="small" vertical>
                      <span>Diện tích đất: </span>
                      <InputNumber
                        id="projectLandArea"
                        placeholder="Nhập diện tích dự án (m2)"
                        size="small"
                        style={{
                          width: "auto",
                          borderRadius: "10px",
                          padding: "10px",
                          outline: "none",
                        }}
                        min={1}
                        value={projectLandArea}
                        onChange={(e) => {
                          if (e <= 1000000001) {
                            setProjectLandArea(e);
                            setProjectLandAreaExceeded(false);
                          } else {
                            setProjectLandAreaExceeded(true);
                          }
                        }}
                      />
                      {projectLandAreaExceeded && (
                        <div style={{ color: "red" }}>
                          Vượt quá giới hạn diện tích đất
                        </div>
                      )}
                    </Flex>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <Flex gap="small" vertical>
                      <span>Diện tích xây dựng: </span>
                      <InputNumber
                        id="projectBuildArea"
                        placeholder="Nhập diện tích (m2)"
                        size="small"
                        style={{
                          width: "auto",
                          borderRadius: "10px",
                          padding: "10px",
                          outline: "none",
                        }}
                        min={1}
                        value={projectBuildArea}
                        onChange={(e) => {
                          if (e > projectLandArea) {
                            setLowerThanLand(true);
                          } else {
                            setLowerThanLand(false);
                          }
                          if (e <= 1000000001) {
                            setProjectBuildArea(e);
                            setProjectBuildAreaExceeded(false);
                          } else {
                            setProjectBuildAreaExceeded(true);
                          }
                        }}
                      />
                      {projectBuildAreaExceeded && (
                        <div style={{ color: "red" }}>
                          Vượt quá giới hạn diện tích xây dựng
                        </div>
                      )}
                      {lowerThanLand && (
                        <div style={{ color: "red" }}>
                          Diện tích xây dựng không thể lớn hơn diện tích đất
                        </div>
                      )}
                    </Flex>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <Flex gap="small" vertical>
                      <span>Số tầng: </span>
                      <InputNumber
                        id="projectFloor"
                        placeholder="Nhập số tầng (1, 2, 3, etc.)"
                        style={{
                          width: "auto",
                          borderRadius: "10px",
                          padding: "10px",
                          outline: "none",
                        }}
                        size="small"
                        value={projectFloor}
                        min={1}
                        onChange={(e) => {
                          if (e <= 101) {
                            setProjectFloor(e);
                            setFloorExceeded(false);
                          } else {
                            setFloorExceeded(true);
                          }
                        }}
                      />
                      {floorExceeded && (
                        <div style={{ color: "red" }}>
                          Vượt quá giới hạn tầng
                        </div>
                      )}
                    </Flex>
                  </div>
                  <div style={{ marginBottom: "25px" }}>
                    <Flex gap="small" vertical>
                      <span>Chọn loại gói</span>
                      <Select
                        placeholder="Chọn loại gói"
                        style={{ width: "100%" }}
                        size="large"
                        onChange={handlePackageChange}
                      >
                        {packageInfos.map((packageItem) => (
                          <Option value={packageItem.packageName}>
                            {packageItem.packageName}
                          </Option>
                        ))}
                      </Select>
                    </Flex>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Card
                bordered={true}
                style={{
                  padding: "20px",
                  minHeight: "100%",
                  border: "1px solid #d9d9d9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <Divider>Tính Giá Xây Dựng</Divider>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 25,
                    }}
                  >
                    <span>Đơn giá: </span>
                    <span>
                      {parseFloat(selectedPrice).toLocaleString(undefined)} đ/m2
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 25,
                    }}
                  >
                    <span>Tổng diện tích sàn: </span>
                    <span>{projectBuildArea * projectFloor} m2</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 25,
                    }}
                  >
                    <span>Tổng cộng: </span>
                    <span style={{ textAlign: "right" }}>
                      {projectFloor * projectBuildArea && selectedPrice
                        ? (
                            parseFloat(projectFloor) *
                              parseFloat(projectBuildArea) *
                              parseFloat(selectedPrice.replace(/[,\s]/g, "")) +
                            parseFloat(totalPrice)
                          ).toLocaleString(undefined) + " đ"
                        : ""}
                    </span>
                  </div>
                  <div>
                    <Divider>Danh Sách Các Hạng Mục</Divider>
                  </div>
                  <div>
                    {packageType.map((type) => (
                      <div key={type.detailNo}>
                        <CategorySlider
                          getData={type}
                          packagePrice={selectedPrice}
                          projectBuildArea={projectBuildArea}
                          onTotalPriceChange={(data) =>
                            handleTotalPriceChange(data)
                          }
                          onTotalPriceDelete={(data) =>
                            handleTotalPriceDelete(data)
                          }
                          toggleOn={(data) => saveCurrentCategory(data)}
                          toggleOff={(data) => deleteCurrentCategory(data)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Button onClick={saveQuoteCustomer}>Lưu</Button>

          <div>
            {handlePackageChangeCalled && (
              <>
                <Title level={5}>{selectedPackage}</Title>
                <PackageDetailHome
                  packageDetailData={packageDetail[selectedKey]}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}

export default QuoteCustomer;
