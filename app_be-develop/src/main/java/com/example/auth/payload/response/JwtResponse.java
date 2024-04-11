package com.example.auth.payload.response;

public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private String phoneNumber;
  private String userCode;
  private String username;
  private String email;
  private String role;

  public JwtResponse(String accessToken, String phoneNumber, String userCode, String username, String email,
      String role) {
    this.token = accessToken;
    this.phoneNumber = phoneNumber;
    this.userCode = userCode;
    this.username = username;
    this.email = email;
    this.role = role;
  }

  public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getUserCode() {
    return userCode;
  }

  public void setUserCode(String userCode) {
    this.userCode = userCode;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getRole() {
    return role;
  }
}
