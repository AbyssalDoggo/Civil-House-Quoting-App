package com.example.auth.security.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.dac.entity.MUser;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private String userCode;

  private String phoneNumber;

  private String username;

  private String email;

  private String role;

  @JsonIgnore
  private String password;

  private Collection<? extends GrantedAuthority> authorities;

  public UserDetailsImpl(String userCode, String phoneNumber, String username, String email,
      String password, String role, Collection<? extends GrantedAuthority> authorities) {
    this.userCode = userCode;
    this.phoneNumber = phoneNumber;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.authorities = authorities;
  }

  public static UserDetailsImpl build(MUser user) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority(user.getRole()));

    return new UserDetailsImpl(user.getUserCode(), user.getPhoneNumber(), user.getUserName(),
        user.getEmail(), user.getPassword(), user.getRole(), authorities);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public String getUserCode() {
    return userCode;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public String getEmail() {
    return email;
  }

  public String getRole() {
    return role;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(userCode, user.userCode);
  }
}
