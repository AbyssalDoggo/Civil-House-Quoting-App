package com.example.dac.dao;

import org.seasar.doma.*;
import org.seasar.doma.boot.ConfigAutowireable;

/**
 * SeqQuoteCodeDao.
 */
@Dao
@ConfigAutowireable
public interface SeqQuoteCodeDao {

  @Select
  int selectNextVal();
}