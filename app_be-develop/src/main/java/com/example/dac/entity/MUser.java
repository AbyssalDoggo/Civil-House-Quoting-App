package com.example.dac.entity;

import java.time.LocalDateTime;
import org.seasar.doma.Column;
import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

/**
 */
@Entity
@Table(name = "m_user")
public class MUser {

  /** */
  @Id
  @Column(name = "phone_number")
  String phoneNumber;

  /** */
  @Column(name = "user_code")
  String userCode;

  /** */
  @Column(name = "user_name")
  String userName;

  /** */
  @Column(name = "email")
  String email;

  /** */
  @Column(name = "password")
  String password;

  /** */
  @Column(name = "role")
  String role;

  /** */
  @Column(name = "delete_flag")
  String deleteFlag;

  /** */
  @Column(name = "create_datetime")
  LocalDateTime createDatetime;

  /** */
  @Column(name = "create_user_code")
  String createUserCode;

  /** */
  @Column(name = "update_datetime")
  LocalDateTime updateDatetime;

  /** */
  @Column(name = "update_user_code")
  String updateUserCode;

  /**
   * Returns the phoneNumber.
   *
   * @return the phoneNumber
   */
  public String getPhoneNumber() {
    return phoneNumber;
  }

  /**
   * Sets the phoneNumber.
   *
   * @param phoneNumber the phoneNumber
   */
  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  /**
   * Returns the userCode.
   *
   * @return the userCode
   */
  public String getUserCode() {
    return userCode;
  }

  /**
   * Sets the userCode.
   *
   * @param userCode the userCode
   */
  public void setUserCode(String userCode) {
    this.userCode = userCode;
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
   * Returns the email.
   *
   * @return the email
   */
  public String getEmail() {
    return email;
  }

  /**
   * Sets the email.
   *
   * @param email the email
   */
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * Returns the password.
   *
   * @return the password
   */
  public String getPassword() {
    return password;
  }

  /**
   * Sets the password.
   *
   * @param password the password
   */
  public void setPassword(String password) {
    this.password = password;
  }

  /**
   * Returns the role.
   *
   * @return the role
   */
  public String getRole() {
    return role;
  }

  /**
   * Sets the role.
   *
   * @param role the role
   */
  public void setRole(String role) {
    this.role = role;
  }

  /**
   * Returns the deleteFlag.
   *
   * @return the deleteFlag
   */
  public String getDeleteFlag() {
    return deleteFlag;
  }

  /**
   * Sets the deleteFlag.
   *
   * @param deleteFlag the deleteFlag
   */
  public void setDeleteFlag(String deleteFlag) {
    this.deleteFlag = deleteFlag;
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

  /**
   * Returns the createUserCode.
   *
   * @return the createUserCode
   */
  public String getCreateUserCode() {
    return createUserCode;
  }

  /**
   * Sets the createUserCode.
   *
   * @param createUserCode the createUserCode
   */
  public void setCreateUserCode(String createUserCode) {
    this.createUserCode = createUserCode;
  }

  /**
   * Returns the updateDatetime.
   *
   * @return the updateDatetime
   */
  public LocalDateTime getUpdateDatetime() {
    return updateDatetime;
  }

  /**
   * Sets the updateDatetime.
   *
   * @param updateDatetime the updateDatetime
   */
  public void setUpdateDatetime(LocalDateTime updateDatetime) {
    this.updateDatetime = updateDatetime;
  }

  /**
   * Returns the updateUserCode.
   *
   * @return the updateUserCode
   */
  public String getUpdateUserCode() {
    return updateUserCode;
  }

  /**
   * Sets the updateUserCode.
   *
   * @param updateUserCode the updateUserCode
   */
  public void setUpdateUserCode(String updateUserCode) {
    this.updateUserCode = updateUserCode;
  }
}