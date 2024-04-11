package com.example.dac.dao;

import com.example.dac.entity.News;
import org.seasar.doma.*;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;

/**
 * NewsDao.
 */
@Dao
@ConfigAutowireable
public interface NewsDao {

  /**
   * News.
   *
   * @param newsId
   * @return the News entity
   */
  @Select
  News selectById(String newsId);

  /**
   * News.
   *
   * @param newsId
   * @return the News entity
   */
  @Select
  News selectByIdForUpdateNoWait(String newsId);

  /**
   * News.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Insert
  int insert(News entity);

  /**
   * News.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Update
  int update(News entity);

  /**
   * News.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Delete
  int delete(News entity);

  @Select
  List<News> selectAllNews();

  @Delete(sqlFile = true)
  int deleteByCondition(String newsId);
}