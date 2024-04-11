package com.example.dac.dao;

import com.example.dac.entity.Projects;
import org.seasar.doma.*;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;

/**
 * ProjectsDao.
 */
@Dao
@ConfigAutowireable
public interface ProjectsDao {

  /**
   * Projects.
   *
   * @param projectsId
   * @return the Projects entity
   */
  @Select
  Projects selectById(String projectsId);

  /**
   * Projects.
   *
   * @param projectsId
   * @return the Projects entity
   */
  @Select
  Projects selectByIdForUpdateNoWait(String projectsId);

  /**
   * Projects.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Insert
  int insert(Projects entity);

  /**
   * Projects.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Update
  int update(Projects entity);

  /**
   * Projects.
   *
   * @param entity Entity
   * @return affected rows
   */
  @Delete
  int delete(Projects entity);

  @Select
  List<Projects> selectAllProjects();

  @Delete(sqlFile = true)
  int deleteByCondition(String projectsId);
}