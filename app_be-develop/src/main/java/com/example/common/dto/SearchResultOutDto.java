package com.example.common.dto;

import java.io.Serializable;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Ba Vuong
 *
 * @param <T>
 */
@Getter
@Setter
public class SearchResultOutDto<T> implements Serializable {

  private static final long serialVersionUID = -1534099065190712116L;

  private List<T> results;

  private PaginationDto meta;

}
