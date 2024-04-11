import React, { useState, useEffect } from "react";
import PackageDetail from "./PackageDetail";
import { Tabs, Input, Button, Flex, Typography } from "antd";
import PackageType from "./PackageType";
import axios from "axios";
import { v4 as uuid } from "uuid";

const { Title } = Typography;

const Package = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [packageInfos, setPackageInfos] = useState([]);
  const [packageDetail, setPackageDetail] = useState([]);
  const [packageType, setPackageType] = useState([]);
  const [packageTypeDetail, setPackageTypeDetail] = useState([]);
  const [newTabTitle, setNewTabTitle] = useState([]);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleAddPackageInfo = () => {
    const newKey = uuid();

    const newPackageInfo = {
      key: newKey,
      packageName: "Gói mới",
    };
    setPackageInfos([...packageInfos, newPackageInfo]);
    setNewTabTitle({
      ...newTabTitle,
      [newKey]: newPackageInfo.packageName,
    });
    setActiveTab(newKey);
  };

  const removePackageInfo = (targetKey) => {
    const targetIndex = packageInfos.findIndex(
      (packageInfo) => packageInfo.key === targetKey
    );
    const newPackageInfos = packageInfos.filter(
      (packageInfo) => packageInfo.key !== targetKey
    );

    if (newPackageInfos.length && targetKey === activeTab) {
      const { key } =
        newPackageInfos[
          targetIndex === newPackageInfos.length ? targetIndex - 1 : targetIndex
        ];
      setActiveTab(key);
    }
    setPackageInfos(newPackageInfos);
  };

  const handlePackagePriceChange = (key, newPrice) => {
    setPackageInfos((prevPackageInfos) =>
      prevPackageInfos.map((packageInfo) =>
        packageInfo.key === key
          ? { ...packageInfo, packagePrice: newPrice }
          : packageInfo
      )
    );
  };

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

          setNewTabTitle((prevPackageTitle) => ({
            ...prevPackageTitle,
            [id]: packageName,
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

          const updatedPackageTypeDetail = packageTypeDetail.map((detail) => ({
            ...detail,
            parentKey: detailNo,
            typeKey: detail.detailNo,
          }));

          setPackageTypeDetail((prevPackageTypeDetail) => ({
            ...prevPackageTypeDetail,
            [detailNo]: updatedPackageTypeDetail,
          }));

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

  const confirmButtonClick = () => {
    let idCounter = 1;

    // Check if packageInfos is available and not empty
    if (!Array.isArray(packageInfos) || packageInfos.length === 0) {
      console.error("Error: packageInfos is not available or empty.");
      return;
    }

    const combinedData = packageInfos.map((tab) => {
      const tabInfo = {
        id: idCounter++,
        packageName: tab.packageName || "",
        packagePrice: tab.packagePrice || "",
      };

      const tabPackageDetail = (tab.packageDetail || []).map(
        (packageDetailItem) => ({
          detailNo: packageDetailItem.detailNo,
          packageDetailName: packageDetailItem.packageDetailName,
          image: packageDetailItem.image,
          detail: packageDetailItem.detail,
        })
      );

      return {
        ...tabInfo,
        packageDetail: tabPackageDetail,
      };
    });

    // Check if packageType is available and not empty
    if (!Array.isArray(packageType) || packageType.length === 0) {
      console.error("Error: packageType is not available or empty.");
      return;
    }

    // Assuming packageTypeDetail is defined elsewhere
    // Check if packageTypeDetail is available
    if (
      !Array.isArray(packageTypeDetail) &&
      typeof packageTypeDetail !== "object"
    ) {
      console.error("Error: packageTypeDetail is not available.");
      return;
    }

    const combinedData2 = packageType.map((type) => {
      let newPackageTypeDetail;
      if (Array.isArray(packageTypeDetail)) {
        newPackageTypeDetail = packageTypeDetail.filter(
          (detail) => detail.parentKey === type.detailNo
        );
      } else if (
        typeof packageTypeDetail === "object" &&
        packageTypeDetail !== null
      ) {
        newPackageTypeDetail = packageTypeDetail[type.detailNo] || [];
      } else {
        newPackageTypeDetail = [];
      }
      return { ...type, packageTypeDetail: newPackageTypeDetail };
    });

    axios
      .post("http://localhost:8080/api/package/savePackage", {
        packageDtoList: combinedData,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });

    axios
      .post("http://localhost:8080/api/package/savePackageType", {
        packageType: combinedData2,
      })
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.message);
        setSuccessful(true);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  };

  const onEdit = (targetKey, action) => {
    if (action === "remove") {
      const newTabs = packageInfos.filter((tab) => tab.key !== targetKey);
      setPackageInfos(newTabs);
    }
    if (action === "add") {
      handleAddPackageInfo();
    } else {
      removePackageInfo(targetKey);
    }
  };

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const handleSavePackageDetail = (data, parentKey) => {
    if (packageDetail) {
      const updatedPackageInfos = packageInfos.map((packageInfo) => {
        if (packageInfo.key === parentKey) {
          return {
            ...packageInfo,
            packageDetail: data,
          };
        }
        return packageInfo;
      });
      setPackageInfos(updatedPackageInfos);
    }
  };

  const handleSavePackageType = (data) => {
    setPackageType(data);
  };

  const handleSavePackageTypeDetail = (data) => {
    setPackageTypeDetail(data);
  };

  const handleInputChange = (key) => (e) => {
    const inputValue = e.target.value;
    // Regular expression to check if the input contains any numbers
    const containsNumbers = /\d/.test(inputValue);

    if (!containsNumbers) {
      // Update state only if the input doesn't contain numbers
      setNewTabTitle((prevTitles) => ({
        ...prevTitles,
        [key]: inputValue,
      }));
    }
  };

  const handleTabTitleChange = (key) => {
    const updatedPackageInfos = packageInfos.map((packageInfo) => {
      if (packageInfo.key === key) {
        return { ...packageInfo, packageName: newTabTitle[key] || "" };
      }
      return packageInfo;
    });
    setPackageInfos(updatedPackageInfos);
  };

  return (
    <>
      <Title level={4} style={{ fontWeight: "bold" }}>
        QUẢN LÝ GÓI DỊCH VỤ
      </Title>

      <div style={{ paddingBottom: "10px" }}>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          style={{ paddingTop: "30px" }}
          type="editable-card"
          onEdit={onEdit}
        >
          {packageInfos.map((packageInfo) => (
            <items
              tab={
                activeTab === packageInfo.key ? (
                  <Input
                    onKeyDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                    onMouseOver={(e) => e.stopPropagation()}
                    value={newTabTitle[packageInfo.key] || ""}
                    onChange={handleInputChange(packageInfo.key)}
                    onBlur={() => handleTabTitleChange(packageInfo.key)}
                  />
                ) : (
                  packageInfo.packageName
                )
              }
              key={packageInfo.key}
            >
              <PackageDetail
                onSave={(data) =>
                  handleSavePackageDetail(data, packageInfo.key)
                }
                packageDetailData={packageDetail[packageInfo.key]}
                parentKey={packageInfo.key}
              />
              <div style={{ marginTop: "20px" }}>
                <span style={{ marginRight: "2px" }}>Giá loại gói: </span>
                <input
                  style={{ width: "60px" }}
                  value={packageInfo.packagePrice}
                  onChange={(e) =>
                    handlePackagePriceChange(packageInfo.key, e.target.value)
                  }
                />
                <span>đ/m2</span>
              </div>
            </items>
          ))}
        </Tabs>
        <div style={{ paddingTop: "30px" }}>
          <PackageType
            onSave={(data) => handleSavePackageType(data)}
            onSave2={(data) => handleSavePackageTypeDetail(data)}
            packageTypeData={packageType}
            packageTypeDetailData={packageTypeDetail}
          />
        </div>
        <Flex
          gap="small"
          style={{ width: "auto", marginTop: "20px" }}
          justify="flex-end"
        >
          <Button key="confirm" onClick={confirmButtonClick}>
            Xác nhận
          </Button>
        </Flex>
        {message && (
          <div
            className="form-group"
            style={{ display: "flex", justifyContent: "right" }}
          >
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
              style={{ marginTop: "15px" }}
            >
              {message}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Package;
