package com.example.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.auth.security.jwt.AuthEntryPointJwt;
import com.example.auth.security.jwt.AuthTokenFilter;
import com.example.auth.security.services.UserDetailsServiceImpl;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {

  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

  @Bean
  DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

//  @Bean
//  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
//      throws Exception {
//    return authConfig.getAuthenticationManager();
//  }

  // @Bean
  // public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
  // return http.getSharedObject(AuthenticationManagerBuilder.class).build();
  // }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // @Override
  // protected void configure(HttpSecurity http) throws Exception {
  // http.cors().and().csrf().disable()
  // .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
  // .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
  // .authorizeRequests().antMatchers("/api/auth/**").permitAll()
  // .antMatchers("/api/test/**").permitAll()
  // .anyRequest().authenticated();
  //
  // http.addFilterBefore(authenticationJwtTokenFilter(),
  // UsernamePasswordAuthenticationFilter.class);
  // }

  // @Bean
  // SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
  // http.csrf(csrf -> csrf.disable())
  // .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
  // .sessionManagement(
  // session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
  // .authorizeHttpRequests(auth -> auth.requestMatchers("/api/auth/**").permitAll()
  // .requestMatchers("/api/test/**").permitAll().anyRequest().authenticated());
  //
  // http.authenticationProvider(authenticationProvider());
  //
  // http.addFilterBefore(authenticationJwtTokenFilter(),
  // UsernamePasswordAuthenticationFilter.class);
  //
  // return http.build();
  // }
}
