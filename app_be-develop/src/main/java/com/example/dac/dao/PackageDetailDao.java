package com.example.dac.dao;

import com.example.dac.entity.PackageDetail;
import org.seasar.doma.*;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;

/**
 * PackageDetailDao.
 */
@Dao
@ConfigAutowireable
public interface PackageDetailDao {

  /**
   * PackageDetail.
   *
   * @param packageId
   * @param detailNo
   * @return the PackageDetail entity
   */
  @Select
  PackageDetail selectById(String packageId, String detailNo);

  /**
   * PackageDetail.
   *
   * @param packageId
   * @param detailNo
   * @return the PackageDetail entity
   */
  @Select
  PackageDetail selectByIdForUpdateNoWait(String packageId, String detailNo);

  /**
   * PackageDetail.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Insert
  int insert(PackageDetail entity);

  /**
   * PackageDetail.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Update
  int update(PackageDetail entity);

  /**
   * PackageDetail.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Delete
  int delete(PackageDetail entity);

  @Delete(sqlFile = true)
  int deleteByCondition();

  @Select
  List<PackageDetail> selectAllPackageDetail(String packageId);
}