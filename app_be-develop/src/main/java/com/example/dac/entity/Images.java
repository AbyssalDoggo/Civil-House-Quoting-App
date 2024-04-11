package com.example.dac.entity;

import org.seasar.doma.Column;
import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

/**
 */
@Entity
@Table(name = "images")
public class Images {

  /** */
  @Id
  @Column(name = "image_id")
  String imageId;

  /** */
  @Column(name = "image_url")
  String imageUrl;

  /**
   * Returns the imageId.
   *
   * @return the imageId
   */
  public String getImageId() {
    return imageId;
  }

  /**
   * Sets the imageId.
   *
   * @param imageId the imageId
   */
  public void setImageId(String imageId) {
    this.imageId = imageId;
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
}