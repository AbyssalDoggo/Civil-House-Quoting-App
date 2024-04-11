package com.example.dac.dao;

import com.example.dac.entity.Images;
import org.seasar.doma.*;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;

/**
 * ImagesDao.
 */
@Dao
@ConfigAutowireable
public interface ImagesDao {

  /**
   * Images.
   *
   * @param imageId
   * @return the Images entity
   */
  @Select
  Images selectById(String imageId);

  /**
   * Images.
   *
   * @param imageId
   * @return the Images entity
   */
  @Select
  Images selectByIdForUpdateNoWait(String imageId);

  /**
   * Images.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Insert
  int insert(Images entity);

  /**
   * Images.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Update
  int update(Images entity);

  /**
   * Images.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Delete
  int delete(Images entity);

  @Delete(sqlFile = true)
  int deleteByCondition();

  @Select
  List<Images> selectAllImages();
}