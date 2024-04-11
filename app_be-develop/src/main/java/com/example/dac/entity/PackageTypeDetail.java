package com.example.dac.entity;

import org.seasar.doma.Column;
import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

/**
 */
@Entity
@Table(name = "package_type_detail")
public class PackageTypeDetail {

  /** */
  @Id
  @Column(name = "package_type_id")
  String packageTypeId;

  /** */
  @Id
  @Column(name = "detail_no")
  String detailNo;

  /** */
  @Column(name = "type_detail_name")
  String typeDetailName;

  /** */
  @Column(name = "coefficient")
  String coefficient;

  /**
   * Returns the packageTypeId.
   *
   * @return the packageTypeId
   */
  public String getPackageTypeId() {
    return packageTypeId;
  }

  /**
   * Sets the packageTypeId.
   *
   * @param packageTypeId the packageTypeId
   */
  public void setPackageTypeId(String packageTypeId) {
    this.packageTypeId = packageTypeId;
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
   * Returns the typeDetailName.
   *
   * @return the typeDetailName
   */
  public String getTypeDetailName() {
    return typeDetailName;
  }

  /**
   * Sets the typeDetailName.
   *
   * @param typeDetailName the typeDetailName
   */
  public void setTypeDetailName(String typeDetailName) {
    this.typeDetailName = typeDetailName;
  }

  /**
   * Returns the coefficient.
   *
   * @return the coefficient
   */
  public String getCoefficient() {
    return coefficient;
  }

  /**
   * Sets the coefficient.
   *
   * @param coefficient the coefficient
   */
  public void setCoefficient(String coefficient) {
    this.coefficient = coefficient;
  }
}