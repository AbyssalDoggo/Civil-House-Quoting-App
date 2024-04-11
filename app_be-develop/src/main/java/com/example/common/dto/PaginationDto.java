package com.example.common.dto;

import lombok.Data;

/**
 * @author Ba Vuong
 *
 */
@Data
public class PaginationDto {

  /**
   * Records per page.
   */
  private Integer pageSize;

  /**
   * Current page.
   */
  private Long page;

  /**
   * Total pages.
   */
  private Long totalPage;

  /**
   * Total record.
   */
  private Long totalRecord;

  /**
   * From record.
   */
  private Long from;

  /**
   * To record.
   */
  private Long to;

  /**
   * Column order by.
   */
  private String orderBy;

  /**
   * Column order direction.
   */
  private String direction;

}
