package com.example.controller;

import com.example.auth.payload.response.JwtResponse;
import com.example.auth.security.jwt.JwtUtils;
import com.example.dac.dao.MUserDao;
import com.example.dac.dao.SeqUserCodeDao;
import com.example.dac.entity.MUser;
import com.example.dto.request.LoginRequest;
import com.example.dto.request.SignupRequest;
import com.example.dto.response.MessageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

  // @Autowired
  // AuthenticationManager authenticationManager;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  MUserDao userDao;

  @Autowired
  SeqUserCodeDao seqUserCodeDao;

  @Autowired
  PasswordEncoder encoder;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    // Authentication authentication =
    // authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
    // loginRequest.getUsername(), loginRequest.getPassword()));
    //
    // SecurityContextHolder.getContext().setAuthentication(authentication);
    // String jwt = jwtUtils.generateJwtToken(authentication);
    //
    // UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    MUser userDetails = userDao.selectById(loginRequest.getPhoneNumber());
    if(userDetails != null && userDetails.getDeleteFlag().equals("0") &&
            encoder.matches(loginRequest.getPassword(), userDetails.getPassword())){
        return ResponseEntity.ok(new JwtResponse("jwt", userDetails.getPhoneNumber(),userDetails.getUserCode(),
                userDetails.getUserName(), userDetails.getEmail(), userDetails.getRole()));
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("Tài khoản chưa đăng kí hoặc mật khẩu không đúng!"));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
     if (userDao.selectById(signUpRequest.getPhoneNumber()) != null) {
     return ResponseEntity.badRequest().body(new MessageResponse("Số điện thoại đã được đăng kí trước đó. Vui lòng nhập số điện thoại khác!"));
     }

    // if (userDao.existsByEmail(signUpRequest.getEmail())) {
    // return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in
    // use!"));
    // }

    // Create new user's account
    // MUser user = new MUser(signUpRequest.getUsername(), signUpRequest.getEmail(),
    // encoder.encode(signUpRequest.getPassword()));
    int userCode = seqUserCodeDao.selectNextVal();

    MUser user = new MUser();
    user.setPhoneNumber(signUpRequest.getPhoneNumber());
    user.setUserCode(new String(String.valueOf(userCode)));
    user.setUserName(signUpRequest.getUsername());
    user.setEmail(signUpRequest.getEmail());
    user.setPassword(encoder.encode(signUpRequest.getPassword()));
    user.setRole("USER");
    user.setDeleteFlag("0");

    userDao.insert(user);

    return ResponseEntity.ok(new MessageResponse("Bạn đã đăng kí tài khoản thành công!"));
  }
}
