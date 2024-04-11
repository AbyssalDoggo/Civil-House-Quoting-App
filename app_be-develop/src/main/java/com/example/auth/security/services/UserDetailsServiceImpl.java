package com.example.auth.security.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.dac.dao.MUserDao;
import com.example.dac.entity.MUser;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private MUserDao userDao;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    MUser user = userDao.findByUsername(username, username);

    if(user == null){
        throw new UsernameNotFoundException("User Not Found with username: " + username);
    }

    return UserDetailsImpl.build(user);
  }

}
