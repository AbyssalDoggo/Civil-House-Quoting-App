package com.example.dto.request;

import jakarta.validation.constraints.NotBlank;import lombok.Data;

@Data
public class LoginRequest {

	@NotBlank
  private String phoneNumber;

	@NotBlank
	private String password;

}
