package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserOutDto {

    private String id;

    private String phoneNumber;

    private String userName;

    private String email;

    private String role;

    private String status;

}
