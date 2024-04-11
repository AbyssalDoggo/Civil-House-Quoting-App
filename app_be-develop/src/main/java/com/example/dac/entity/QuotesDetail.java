package com.example.dac.entity;

import org.seasar.doma.Column;
import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

/**
 */
@Entity
@Table(name = "quotes_detail")
public class QuotesDetail {

  /** */
  @Id
  @Column(name = "quotes_id")
  String quotesId;

  /** */
  @Id
  @Column(name = "detail_no")
  String detailNo;

  /** */
  @Column(name = "category")
  String category;

  /** */
  @Column(name = "selected_category")
  String selectedCategory;

  /** */
  @Column(name = "coefficient")
  String coefficient;

  /** */
  @Column(name = "build_area")
  String buildArea;

  /** */
  @Column(name = "cost")
  String cost;

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
   * Returns the category.
   *
   * @return the category
   */
  public String getCategory() {
    return category;
  }

  /**
   * Sets the category.
   *
   * @param category the category
   */
  public void setCategory(String category) {
    this.category = category;
  }

  /**
   * Returns the selectedCategory.
   *
   * @return the selectedCategory
   */
  public String getSelectedCategory() {
    return selectedCategory;
  }

  /**
   * Sets the selectedCategory.
   *
   * @param selectedCategory the selectedCategory
   */
  public void setSelectedCategory(String selectedCategory) {
    this.selectedCategory = selectedCategory;
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

  /**
   * Returns the buildArea.
   *
   * @return the buildArea
   */
  public String getBuildArea() {
    return buildArea;
  }

  /**
   * Sets the buildArea.
   *
   * @param buildArea the buildArea
   */
  public void setBuildArea(String buildArea) {
    this.buildArea = buildArea;
  }

  /**
   * Returns the cost.
   *
   * @return the cost
   */
  public String getCost() {
    return cost;
  }

  /**
   * Sets the cost.
   *
   * @param cost the cost
   */
  public void setCost(String cost) {
    this.cost = cost;
  }
}