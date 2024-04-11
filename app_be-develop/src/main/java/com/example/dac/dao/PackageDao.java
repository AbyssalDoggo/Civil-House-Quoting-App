package com.example.dac.dao;

import com.example.dac.entity.Package;
import org.seasar.doma.*;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;

/**
 * PackageDao.
 */
@Dao
@ConfigAutowireable
public interface PackageDao {

  /**
   * Package.
   *
   * @param packageId
   * @return the Package entity
   */
  @Select
  Package selectById(String packageId);

  /**
   * Package.
   *
   * @param packageId
   * @return the Package entity
   */
  @Select
  Package selectByIdForUpdateNoWait(String packageId);

  /**
   * Package.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Insert
  int insert(Package entity);

  /**
   * Package.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Update
  int update(Package entity);

  /**
   * Package.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Delete
  int delete(Package entity);

    @Delete(sqlFile = true)
    int deleteByCondition();

  @Select
  List<Package> selectAllPackage();
}