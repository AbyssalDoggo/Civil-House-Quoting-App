package com.example.controller;

import com.example.common.service.AbstractController;
import com.example.dto.UserInDto;
import com.example.dto.UserOutDto;
import com.example.dto.response.MessageResponse;import com.example.service.ManagerUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ManagerUserController extends AbstractController {

    private final ManagerUserService managerUserService;

    @PostMapping("/clients")
    public ResponseEntity<?> getAllUser() {
        List<UserOutDto> outDto = managerUserService.getAllUser();
        return ResponseEntity.ok(outDto);
    }

    @PostMapping("/client")
    public ResponseEntity<?> getUser(@RequestBody UserInDto inDto) {
        UserOutDto outDto = managerUserService.getUser(inDto.getPhoneNumber());
        return ResponseEntity.ok(outDto);
    }

    @PostMapping("/client/save")
    public ResponseEntity<?> save(@RequestBody UserInDto inDto) {
        managerUserService.save(inDto);
        return ResponseEntity.ok(new MessageResponse("Bạn đã thay đổi thông tin tài khoản thành công!"));
    }

    @PostMapping("/client/delete")
    public ResponseEntity<?> delete(@RequestBody UserInDto inDto) {
        managerUserService.delete(inDto);
        return ResponseEntity.ok(new MessageResponse("Bạn đã xoá tài khoản thành công!"));
    }
}
