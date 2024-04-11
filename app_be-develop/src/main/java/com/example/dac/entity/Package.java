package com.example.dac.entity;

import org.seasar.doma.Column;
import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

/**
 */
@Entity
@Table(name = "package")
public class Package {

  /** */
  @Id
  @Column(name = "package_id")
  String packageId;

  /** */
  @Column(name = "package_name")
  String packageName;

  /** */
  @Column(name = "unit_price")
  String unitPrice;

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
   * Returns the packageName.
   *
   * @return the packageName
   */
  public String getPackageName() {
    return packageName;
  }

  /**
   * Sets the packageName.
   *
   * @param packageName the packageName
   */
  public void setPackageName(String packageName) {
    this.packageName = packageName;
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
}