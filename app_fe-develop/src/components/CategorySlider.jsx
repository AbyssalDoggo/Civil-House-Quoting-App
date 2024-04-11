import React, { useState, useEffect } from "react";
import {
  Switch,
  Modal,
  Radio,
  Flex,
  InputNumber,
  Typography,
  Divider,
  Button,
} from "antd";

const { Title } = Typography;

const CategorySlider = ({
  getData,
  packagePrice,
  projectBuildArea,
  onTotalPriceChange,
  onTotalPriceDelete,
  toggleOn,
  toggleOff,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedCoefficient, setSelectedCoefficient] = useState(null);
  const [selectedTypeDetailName, setSelectedTypeDetailName] = useState(null);
  const [coefficient, setCoefficient] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCoefficient(selectedCoefficient);
    changeTotal();
  }, [selectedCoefficient, packagePrice, projectBuildArea]);

  const calculateTotalPrice = () => {
    if (packagePrice && projectBuildArea && coefficient) {
      const totalPriceValue = packagePrice * projectBuildArea * coefficient;
      setTotalPrice(totalPriceValue);
      onTotalPriceChange(totalPriceValue);
    }
  };

  const changeTotal = () => {
    const totalPriceValue = packagePrice * projectBuildArea * coefficient;
    setTotalPrice(totalPriceValue);
  };

  const handleToggle = () => {
    setShowDetails(!showDetails);
    const totalPriceValue =
      packagePrice * projectBuildArea * selectedCoefficient;

    const combinedData = {
      category: getData.packageTypeName,
      selectedCategory: selectedTypeDetailName,
      coefficient: selectedCoefficient,
      buildArea: projectBuildArea * selectedCoefficient,
      cost: packagePrice * projectBuildArea * selectedCoefficient,
    };

    if (!showDetails == false) {
      onTotalPriceDelete(totalPriceValue);
      toggleOff(combinedData);
    }
    if (!showDetails) {
      setShowModal(true);
    }
  };

  const handleToggle2 = () => {
    const totalPriceValue =
      packagePrice * projectBuildArea * selectedCoefficient;
    const combinedData = {
      category: getData.packageTypeName,
      selectedCategory: selectedTypeDetailName,
      coefficient: selectedCoefficient,
      buildArea: projectBuildArea * selectedCoefficient,
      cost: packagePrice * projectBuildArea * selectedCoefficient,
    };

    setShowModal(true);
    onTotalPriceDelete(totalPriceValue);
    toggleOff(combinedData);
  };

  const handleModalClose = () => {
    const combinedData = {
      category: getData.packageTypeName,
      selectedCategory: selectedTypeDetailName,
      coefficient: selectedCoefficient,
      buildArea: projectBuildArea * selectedCoefficient,
      cost: packagePrice * projectBuildArea * selectedCoefficient,
    };

    setShowModal(false);
    calculateTotalPrice();
    toggleOn(combinedData);
  };

  const modalClose = () => {
    setShowModal(false);
  };

  const handleOptionChange = (e) => {
    const selectedDetailNo = e.target.value;
    setSelectedValue(selectedDetailNo);

    const selectedItem = getData.packageTypeDetail.find(
      (item) => item.detailNo === selectedDetailNo
    );
    setSelectedTypeDetailName(selectedItem.typeDetailName);
    setSelectedCoefficient(selectedItem.coefficient);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
        marginBottom: "25px",
      }}
    >
      <div>
        <Flex justify="space-between">
          <div style={{ display: "flex" }}>
            <Switch
              onChange={handleToggle}
              style={{ border: "1px solid #d9d9d9" }}
            />
            <div style={{ marginLeft: "8px" }}>{getData.packageTypeName}</div>
          </div>
          {showDetails && (
            <div>
              <div>
                {totalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 3,
                })}{" "}
                đ
              </div>
            </div>
          )}
        </Flex>
      </div>

      {showDetails && (
        <Flex justify="space-between">
          <div
            style={{
              cursor: "pointer",
              marginLeft: "52px",
              textDecoration: "underline",
            }}
            onClick={handleToggle2}
          >
            Chi tiết
          </div>
          <span>
            {`${
              Number.isInteger(projectBuildArea * coefficient)
                ? projectBuildArea * coefficient
                : (projectBuildArea * coefficient).toFixed(2)
            }
              m2`}
          </span>
        </Flex>
      )}

      {showDetails && (
        <Modal
          open={showModal}
          onCancel={modalClose}
          footer={[
            <Button key="save" onClick={handleModalClose}>
              Lưu
            </Button>,
          ]}
        >
          <Title level={2}></Title>
          <Flex
            vertical
            align="flex-start"
            justify="center"
            gap="middle"
            style={{ padding: "10px" }}
          >
            <div>Diện tích</div>
            <InputNumber
              value={projectBuildArea}
              readOnly
              style={{ width: "100%" }}
            />
            <Divider />
            <Radio.Group
              size="large"
              onChange={handleOptionChange}
              value={selectedValue}
            >
              <Flex vertical gap="small">
                {getData.packageTypeDetail
                  .sort((a, b) => parseInt(a.detailNo) - parseInt(b.detailNo))
                  .map((item) => (
                    <Radio key={item.detailNo} value={item.detailNo}>
                      {item.typeDetailName}
                    </Radio>
                  ))}
              </Flex>
            </Radio.Group>
          </Flex>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <div>
              <div>Hệ số</div>
              <div>Diện tích thi công</div>
              <div>Đơn giá</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div>
                {selectedCoefficient} ({selectedCoefficient * 100}% diện tích)
              </div>
              <div>{projectBuildArea * selectedCoefficient} m2</div>
              <div>
                {parseFloat(packagePrice).toLocaleString(undefined)} đ/m2
              </div>
            </div>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <div>Thành tiền</div>
            <div>
              {(
                packagePrice *
                projectBuildArea *
                selectedCoefficient
              ).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 3,
              })}{" "}
              đ
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CategorySlider;
