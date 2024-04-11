package com.example.service;

import com.example.common.service.AbstractService;
import com.example.dac.dao.MUserDao;
import com.example.dac.entity.MUser;
import com.example.dto.UserInDto;import com.example.dto.UserOutDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ManagerUserService extends AbstractService {

    private final MUserDao userDao;

    public List<UserOutDto> getAllUser() {
        List<MUser> listUser = userDao.selectAllUser();
        List<UserOutDto> listOutDto = new ArrayList<>();
        int id = 1;
        for (MUser user: listUser){
            UserOutDto outDto = new UserOutDto();
            outDto.setId(String.valueOf(id));
            outDto.setPhoneNumber(user.getPhoneNumber());
            outDto.setUserName(user.getUserName());
            outDto.setEmail(user.getEmail());
            outDto.setRole(user.getRole());
            outDto.setStatus(user.getDeleteFlag());
            listOutDto.add(outDto);
            id++;
        }
        return listOutDto;
    }

    public UserOutDto getUser(String phoneNumber) {
        MUser user = userDao.selectById(phoneNumber);
        UserOutDto outDto = new UserOutDto();
        if(user != null){
            outDto.setPhoneNumber(user.getPhoneNumber());
            outDto.setUserName(user.getUserName());
            outDto.setEmail(user.getEmail());
            outDto.setRole(user.getRole());
        }
        return outDto;
    }

    @Transactional(rollbackFor = Throwable.class)
    public UserInDto save(UserInDto inDto) {
        MUser user = userDao.selectById(inDto.getPhoneNumber());
        user.setUserName(inDto.getUserName());
        user.setEmail(inDto.getEmail());
        user.setRole(inDto.getRole());
        userDao.update(user);
        return inDto;
    }

    @Transactional(rollbackFor = Throwable.class)
    public UserInDto delete(UserInDto inDto) {
        MUser user = userDao.selectById(inDto.getPhoneNumber());
        user.setDeleteFlag(user.getDeleteFlag().equals("0") ? "1" : "0");
        userDao.update(user);
        return inDto;
    }
}
