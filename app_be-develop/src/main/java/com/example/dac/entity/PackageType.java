package com.example.dac.entity;

import org.seasar.doma.Column;
import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

/**
 */
@Entity
@Table(name = "package_type")
public class PackageType {

  /** */
  @Id
  @Column(name = "package_type_id")
  String packageTypeId;

  /** */
  @Column(name = "package_type_name")
  String packageTypeName;

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
   * Returns the packageTypeName.
   *
   * @return the packageTypeName
   */
  public String getPackageTypeName() {
    return packageTypeName;
  }

  /**
   * Sets the packageTypeName.
   *
   * @param packageTypeName the packageTypeName
   */
  public void setPackageTypeName(String packageTypeName) {
    this.packageTypeName = packageTypeName;
  }
}