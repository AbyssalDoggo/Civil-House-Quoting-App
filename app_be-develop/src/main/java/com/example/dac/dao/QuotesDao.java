package com.example.dac.dao;

import com.example.dac.entity.News;
import com.example.dac.entity.Quotes;
import org.seasar.doma.Dao;
import org.seasar.doma.Delete;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.Update;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;

/**
 * QuotesDao.
 */
@Dao
@ConfigAutowireable
public interface QuotesDao {

  /**
   * Quotes.
   *
   * @param quotesId
   * @return the Quotes entity
   */
  @Select
  Quotes selectById(String quotesId);

  /**
   * Quotes.
   *
   * @param quotesId
   * @return the Quotes entity
   */
  @Select
  Quotes selectByIdForUpdateNoWait(String quotesId);

  /**
   * Quotes.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Insert
  int insert(Quotes entity);

  /**
   * Quotes.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Update
  int update(Quotes entity);

  /**
   * Quotes.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Delete
  int delete(Quotes entity);

  @Select
  List<Quotes> selectAllQuotes();
}