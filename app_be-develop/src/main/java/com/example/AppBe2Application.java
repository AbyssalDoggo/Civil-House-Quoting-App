package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
// @ComponentScan(basePackages = "com.example")
public class AppBe2Application {

  public static void main(String[] args) {
    SpringApplication.run(AppBe2Application.class, args);
  }

}
