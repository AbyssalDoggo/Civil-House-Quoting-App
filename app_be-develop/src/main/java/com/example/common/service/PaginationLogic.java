package com.example.common.service;

import org.seasar.doma.jdbc.SelectOptions;
import org.springframework.stereotype.Component;
import com.example.common.dto.PaginationDto;

@Component
public class PaginationLogic {

  /**
   * Get select option no count.
   *
   * @param page current page
   * @param pageSize page size
   * @return SelectOptions
   */
  public SelectOptions getSearchOptions(long page, int pageSize) {

    int offset = (int) ((page - 1) * pageSize);
    SelectOptions selectOptions = SelectOptions.get();
    if (offset > 0) {
      selectOptions = selectOptions.offset(offset);
    }
    if (pageSize > 0) {
      selectOptions = selectOptions.limit(pageSize);
    }

    return selectOptions.count();
  }

  /**
   * Get select option no count.
   *
   * @param page current page
   * @param pageSize page size
   * @return SelectOptions
   */
  public SelectOptions getSearchOptionsNoCount(long page, int pageSize) {

    int offset = (int) ((page - 1) * pageSize);
    SelectOptions selectOptions = SelectOptions.get();
    if (offset > 0) {
      selectOptions = selectOptions.offset(offset);
    }
    if (pageSize > 0) {
      selectOptions = selectOptions.limit(pageSize);
    }

    return selectOptions;
  }

  /**
   * calculate to pagination result dto.
   *
   * @param page current page
   * @param pageSize page size
   * @param totalRecord total record
   * @param orderBy order by
   * @param direction asc / desc
   * @return PaginationResultDto
   */
  public PaginationDto getPaginationInfo(long page, int pageSize, long totalRecord, String orderBy,
      String direction) {

    if (pageSize == 0) {
      pageSize = 10;
    }

    PaginationDto result = new PaginationDto();

    result.setPageSize(pageSize);
    result.setPage(page);
    result.setTotalRecord(totalRecord);
    result.setOrderBy(orderBy);
    result.setDirection(direction);


    long from = 1;
    if (totalRecord == 0) {
      from = 0;
      result.setPage(0L);
      result.setFrom(0L);
    }

    if (result.getPage() > 1) {
      from = (result.getPage() - 1) * pageSize + 1;
    }
    long to = result.getPage() * pageSize;
    if (to > totalRecord) {
      to = totalRecord;
    }
    result.setFrom(from);
    result.setTo(to);

    long totalPage = totalRecord / pageSize;
    if (totalRecord % pageSize != 0) {
      totalPage++;
    }
    result.setTotalPage(totalPage);

    return result;
  }

}
