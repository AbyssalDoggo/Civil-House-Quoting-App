package com.example.common.service;

import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public abstract class AbstractService {
}
