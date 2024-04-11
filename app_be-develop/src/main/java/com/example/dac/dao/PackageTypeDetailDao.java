package com.example.dac.dao;

import com.example.dac.entity.PackageTypeDetail;
import org.seasar.doma.*;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;

/**
 * PackageTypeDetailDao.
 */
@Dao
@ConfigAutowireable
public interface PackageTypeDetailDao {

  /**
   * PackageTypeDetail.
   *
   * @param packageTypeId
   * @param detailNo
   * @return the PackageTypeDetail entity
   */
  @Select
  PackageTypeDetail selectById(String packageTypeId, String detailNo);

  /**
   * PackageTypeDetail.
   *
   * @param packageTypeId
   * @param detailNo
   * @return the PackageTypeDetail entity
   */
  @Select
  PackageTypeDetail selectByIdForUpdateNoWait(String packageTypeId, String detailNo);

  /**
   * PackageTypeDetail.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Insert
  int insert(PackageTypeDetail entity);

  /**
   * PackageTypeDetail.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Update
  int update(PackageTypeDetail entity);

  /**
   * PackageTypeDetail.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Delete
  int delete(PackageTypeDetail entity);

    @Delete(sqlFile = true)
    int deleteByCondition();

  @Select
  List<PackageTypeDetail> selectAllPackageTypeDetail(String packageTypeId);
}