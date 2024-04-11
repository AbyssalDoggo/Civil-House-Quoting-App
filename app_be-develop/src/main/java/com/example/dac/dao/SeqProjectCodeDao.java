package com.example.dac.dao;

import org.seasar.doma.Dao;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;

/**
 * SeqProjectCodeDao.
 */
@Dao
@ConfigAutowireable
public interface SeqProjectCodeDao {

  @Select
  int selectNextVal();

}