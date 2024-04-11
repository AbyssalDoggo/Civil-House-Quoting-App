package com.example.dac.entity;

import java.time.LocalDateTime;
import org.seasar.doma.Column;
import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

/**
 */
@Entity
@Table(name = "news")
public class News {

  /** */
  @Id
  @Column(name = "news_id")
  String newsId;

  /** */
  @Column(name = "title")
  String title;

  /** */
  @Column(name = "image_url")
  String imageUrl;

  /** */
  @Column(name = "written_by")
  String writtenBy;

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
   * Returns the newsId.
   *
   * @return the newsId
   */
  public String getNewsId() {
    return newsId;
  }

  /**
   * Sets the newsId.
   *
   * @param newsId the newsId
   */
  public void setNewsId(String newsId) {
    this.newsId = newsId;
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
   * Returns the writtenBy.
   *
   * @return the writtenBy
   */
  public String getWrittenBy() {
    return writtenBy;
  }

  /**
   * Sets the writtenBy.
   *
   * @param writtenBy the writtenBy
   */
  public void setWrittenBy(String writtenBy) {
    this.writtenBy = writtenBy;
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