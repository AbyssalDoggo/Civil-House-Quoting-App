package com.example.dac.entity;

import java.time.LocalDateTime;
import org.seasar.doma.Column;
import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

/**
 */
@Entity
@Table(name = "quotes")
public class Quotes {

  /** */
  @Id
  @Column(name = "quotes_id")
  String quotesId;

  /** */
  @Column(name = "user_name")
  String userName;

  /** */
  @Column(name = "user_phone_number")
  String userPhoneNumber;

  /** */
  @Column(name = "project_land_area")
  String projectLandArea;

  /** */
  @Column(name = "project_build_area")
  String projectBuildArea;

  /** */
  @Column(name = "project_floor")
  String projectFloor;

  /** */
  @Column(name = "selected_package")
  String selectedPackage;

  /** */
  @Column(name = "unit_price")
  String unitPrice;

  /** */
  @Column(name = "total_floor_area")
  String totalFloorArea;

  /** */
  @Column(name = "total_price")
  String totalPrice;

  /** */
  @Column(name = "create_datetime")
  LocalDateTime createDatetime;

  /**
   * Returns the quotesId.
   *
   * @return the quotesId
   */
  public String getQuotesId() {
    return quotesId;
  }

  /**
   * Sets the quotesId.
   *
   * @param quotesId the quotesId
   */
  public void setQuotesId(String quotesId) {
    this.quotesId = quotesId;
  }

  /**
   * Returns the userName.
   *
   * @return the userName
   */
  public String getUserName() {
    return userName;
  }

  /**
   * Sets the userName.
   *
   * @param userName the userName
   */
  public void setUserName(String userName) {
    this.userName = userName;
  }

  /**
   * Returns the userPhoneNumber.
   *
   * @return the userPhoneNumber
   */
  public String getUserPhoneNumber() {
    return userPhoneNumber;
  }

  /**
   * Sets the userPhoneNumber.
   *
   * @param userPhoneNumber the userPhoneNumber
   */
  public void setUserPhoneNumber(String userPhoneNumber) {
    this.userPhoneNumber = userPhoneNumber;
  }

  /**
   * Returns the projectLandArea.
   *
   * @return the projectLandArea
   */
  public String getProjectLandArea() {
    return projectLandArea;
  }

  /**
   * Sets the projectLandArea.
   *
   * @param projectLandArea the projectLandArea
   */
  public void setProjectLandArea(String projectLandArea) {
    this.projectLandArea = projectLandArea;
  }

  /**
   * Returns the projectBuildArea.
   *
   * @return the projectBuildArea
   */
  public String getProjectBuildArea() {
    return projectBuildArea;
  }

  /**
   * Sets the projectBuildArea.
   *
   * @param projectBuildArea the projectBuildArea
   */
  public void setProjectBuildArea(String projectBuildArea) {
    this.projectBuildArea = projectBuildArea;
  }

  /**
   * Returns the projectFloor.
   *
   * @return the projectFloor
   */
  public String getProjectFloor() {
    return projectFloor;
  }

  /**
   * Sets the projectFloor.
   *
   * @param projectFloor the projectFloor
   */
  public void setProjectFloor(String projectFloor) {
    this.projectFloor = projectFloor;
  }

  /**
   * Returns the selectedPackage.
   *
   * @return the selectedPackage
   */
  public String getSelectedPackage() {
    return selectedPackage;
  }

  /**
   * Sets the selectedPackage.
   *
   * @param selectedPackage the selectedPackage
   */
  public void setSelectedPackage(String selectedPackage) {
    this.selectedPackage = selectedPackage;
  }

  /**
   * Returns the unitPrice.
   *
   * @return the unitPrice
   */
  public String getUnitPrice() {
    return unitPrice;
  }

  /**
   * Sets the unitPrice.
   *
   * @param unitPrice the unitPrice
   */
  public void setUnitPrice(String unitPrice) {
    this.unitPrice = unitPrice;
  }

  /**
   * Returns the totalFloorArea.
   *
   * @return the totalFloorArea
   */
  public String getTotalFloorArea() {
    return totalFloorArea;
  }

  /**
   * Sets the totalFloorArea.
   *
   * @param totalFloorArea the totalFloorArea
   */
  public void setTotalFloorArea(String totalFloorArea) {
    this.totalFloorArea = totalFloorArea;
  }

  /**
   * Returns the totalPrice.
   *
   * @return the totalPrice
   */
  public String getTotalPrice() {
    return totalPrice;
  }

  /**
   * Sets the totalPrice.
   *
   * @param totalPrice the totalPrice
   */
  public void setTotalPrice(String totalPrice) {
    this.totalPrice = totalPrice;
  }

  /**
   * Returns the createDatetime.
   *
   * @return the createDatetime
   */
  public LocalDateTime getCreateDatetime() {
    return createDatetime;
  }

  /**
   * Sets the createDatetime.
   *
   * @param createDatetime the createDatetime
   */
  public void setCreateDatetime(LocalDateTime createDatetime) {
    this.createDatetime = createDatetime;
  }
}