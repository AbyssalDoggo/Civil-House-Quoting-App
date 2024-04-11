package com.example.dac.entity;

import org.seasar.doma.Column;
import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

/**
 */
@Entity
@Table(name = "package_detail")
public class PackageDetail {

  /** */
  @Id
  @Column(name = "package_id")
  String packageId;

  /** */
  @Id
  @Column(name = "detail_no")
  String detailNo;

  /** */
  @Column(name = "image")
  String image;

  /** */
  @Column(name = "package_detail_name")
  String packageDetailName;

  /** */
  @Column(name = "detail")
  String detail;

  /**
   * Returns the packageId.
   *
   * @return the packageId
   */
  public String getPackageId() {
    return packageId;
  }

  /**
   * Sets the packageId.
   *
   * @param packageId the packageId
   */
  public void setPackageId(String packageId) {
    this.packageId = packageId;
  }

  /**
   * Returns the detailNo.
   *
   * @return the detailNo
   */
  public String getDetailNo() {
    return detailNo;
  }

  /**
   * Sets the detailNo.
   *
   * @param detailNo the detailNo
   */
  public void setDetailNo(String detailNo) {
    this.detailNo = detailNo;
  }

  /**
   * Returns the image.
   *
   * @return the image
   */
  public String getImage() {
    return image;
  }

  /**
   * Sets the image.
   *
   * @param image the image
   */
  public void setImage(String image) {
    this.image = image;
  }

  /**
   * Returns the packageDetailName.
   *
   * @return the packageDetailName
   */
  public String getPackageDetailName() {
    return packageDetailName;
  }

  /**
   * Sets the packageDetailName.
   *
   * @param packageDetailName the packageDetailName
   */
  public void setPackageDetailName(String packageDetailName) {
    this.packageDetailName = packageDetailName;
  }

  /**
   * Returns the detail.
   *
   * @return the detail
   */
  public String getDetail() {
    return detail;
  }

  /**
   * Sets the detail.
   *
   * @param detail the detail
   */
  public void setDetail(String detail) {
    this.detail = detail;
  }
}