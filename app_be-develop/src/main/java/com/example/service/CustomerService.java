package com.example.service;

import com.example.common.service.AbstractService;
import com.example.dac.dao.MUserDao;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomerService extends AbstractService {

    private final MUserDao userDao;

}
