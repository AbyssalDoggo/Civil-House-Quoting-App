package com.example.dac.entity;

import java.time.LocalDateTime;
import org.seasar.doma.Column;
import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

/**
 */
@Entity
@Table(name = "projects")
public class Projects {

  /** */
  @Id
  @Column(name = "projects_id")
  String projectsId;

  /** */
  @Column(name = "title")
  String title;

  /** */
  @Column(name = "architect")
  String architect;

  /** */
  @Column(name = "area")
  String area;

  /** */
  @Column(name = "year")
  String year;

  /** */
  @Column(name = "image_url")
  String imageUrl;

  /** */
  @Column(name = "body")
  String body;

  /** */
  @Column(name = "create_datetime")
  LocalDateTime createDatetime;

  /** */
  @Column(name = "create_user_code")
  String createUserCode;

  /**
   * Returns the projectsId.
   *
   * @return the projectsId
   */
  public String getProjectsId() {
    return projectsId;
  }

  /**
   * Sets the projectsId.
   *
   * @param projectsId the projectsId
   */
  public void setProjectsId(String projectsId) {
    this.projectsId = projectsId;
  }

  /**
   * Returns the title.
   *
   * @return the title
   */
  public String getTitle() {
    return title;
  }

  /**
   * Sets the title.
   *
   * @param title the title
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * Returns the architect.
   *
   * @return the architect
   */
  public String getArchitect() {
    return architect;
  }

  /**
   * Sets the architect.
   *
   * @param architect the architect
   */
  public void setArchitect(String architect) {
    this.architect = architect;
  }

  /**
   * Returns the area.
   *
   * @return the area
   */
  public String getArea() {
    return area;
  }

  /**
   * Sets the area.
   *
   * @param area the area
   */
  public void setArea(String area) {
    this.area = area;
  }

  /**
   * Returns the year.
   *
   * @return the year
   */
  public String getYear() {
    return year;
  }

  /**
   * Sets the year.
   *
   * @param year the year
   */
  public void setYear(String year) {
    this.year = year;
  }

  /**
   * Returns the imageUrl.
   *
   * @return the imageUrl
   */
  public String getImageUrl() {
    return imageUrl;
  }

  /**
   * Sets the imageUrl.
   *
   * @param imageUrl the imageUrl
   */
  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  /**
   * Returns the body.
   *
   * @return the body
   */
  public String getBody() {
    return body;
  }

  /**
   * Sets the body.
   *
   * @param body the body
   */
  public void setBody(String body) {
    this.body = body;
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
}