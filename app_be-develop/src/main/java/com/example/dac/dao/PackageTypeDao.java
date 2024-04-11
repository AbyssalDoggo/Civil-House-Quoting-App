package com.example.dac.dao;

import com.example.dac.entity.PackageType;
import org.seasar.doma.*;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;

/**
 * PackageTypeDao.
 */
@Dao
@ConfigAutowireable
public interface PackageTypeDao {

  /**
   * PackageType.
   *
   * @param packageTypeId
   * @return the PackageType entity
   */
  @Select
  PackageType selectById(String packageTypeId);

  /**
   * PackageType.
   *
   * @param packageTypeId
   * @return the PackageType entity
   */
  @Select
  PackageType selectByIdForUpdateNoWait(String packageTypeId);

  /**
   * PackageType.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Insert
  int insert(PackageType entity);

  /**
   * PackageType.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Update
  int update(PackageType entity);

  /**
   * PackageType.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Delete
  int delete(PackageType entity);

    @Delete(sqlFile = true)
    int deleteByCondition();

  @Select
  List<PackageType> selectAllPackageType();
}