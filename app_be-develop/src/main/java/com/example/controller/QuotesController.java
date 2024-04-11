package com.example.controller;

import com.example.common.service.AbstractController;
import com.example.dto.NewsInDto;
import com.example.dto.QuotesInDto;
import com.example.dto.response.MessageResponse;
import com.example.service.NewsService;
import com.example.service.QuotesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class QuotesController extends AbstractController {

    private final QuotesService quotesService;

    @PostMapping("/quotes/save")
    public ResponseEntity<?> save(@RequestBody QuotesInDto inDto) {
        quotesService.save(inDto);
        return ResponseEntity.ok(new MessageResponse("Bạn đã lưu thành công!"));
    }

    @PostMapping("/quotes/get")
    public ResponseEntity<?> get() {
        List<QuotesInDto> outDto = quotesService.get();
        return ResponseEntity.ok(outDto);
    }
}
