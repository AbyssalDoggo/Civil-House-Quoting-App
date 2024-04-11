package com.example.dac.dao;

import com.example.dac.entity.MUser;
import org.seasar.doma.*;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;

/**
 * MUserDao.
 */
@Dao
@ConfigAutowireable
public interface MUserDao {

  /**
   * MUser.
   *
   * @param phoneNumber
   * @return the MUser entity
   */
  @Select
  MUser selectById(String phoneNumber);

  /**
   * MUser.
   *
   * @param phoneNumber
   * @return the MUser entity
   */
  @Select
  MUser selectByIdForUpdateNoWait(String phoneNumber);

  /**
   * MUser.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Insert
  int insert(MUser entity);

  /**
   * MUser.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Update
  int update(MUser entity);

  /**
   * MUser.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Delete
  int delete(MUser entity);

    /**
     * existsByEmail.
     *
     * @param phoneNumber String
     * @return affected rows
     */
    @Select
    MUser findByUsername(String phoneNumber, String password);

    @Select
    List<MUser> selectAllUser();
}