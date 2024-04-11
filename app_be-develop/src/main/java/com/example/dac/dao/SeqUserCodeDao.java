package com.example.dac.dao;

import org.seasar.doma.Dao;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;

@Dao
@ConfigAutowireable
public interface SeqUserCodeDao {

    @Select
    int selectNextVal();

}
