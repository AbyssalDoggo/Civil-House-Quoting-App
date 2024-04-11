package com.example.dac.dao;

import com.example.dac.entity.QuotesDetail;
import org.seasar.doma.Dao;
import org.seasar.doma.Delete;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.Update;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;

/**
 * QuotesDetailDao.
 */
@Dao
@ConfigAutowireable
public interface QuotesDetailDao {

  /**
   * QuotesDetail.
   *
   * @param quotesId
   * @param detailNo
   * @return the QuotesDetail entity
   */
  @Select
  QuotesDetail selectById(String quotesId, String detailNo);

  /**
   * QuotesDetail.
   *
   * @param quotesId
   * @param detailNo
   * @return the QuotesDetail entity
   */
  @Select
  QuotesDetail selectByIdForUpdateNoWait(String quotesId, String detailNo);

  /**
   * QuotesDetail.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Insert
  int insert(QuotesDetail entity);

  /**
   * QuotesDetail.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Update
  int update(QuotesDetail entity);

  /**
   * QuotesDetail.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Delete
  int delete(QuotesDetail entity);

  @Select
  List<QuotesDetail> selectByCondition(String quotesId);
}