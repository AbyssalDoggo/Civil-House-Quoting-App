package com.example.controller;

import com.example.common.service.AbstractController;
import com.example.dto.NewsInDto;
import com.example.dto.response.MessageResponse;
import com.example.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class NewsController extends AbstractController {

    private final NewsService newsService;

    @PostMapping("/news/save")
    public ResponseEntity<?> save(@RequestBody NewsInDto inDto) {
        newsService.save(inDto);
        return ResponseEntity.ok(new MessageResponse("Bạn đã lưu thành công!"));
    }

    @PostMapping("/news/get")
    public ResponseEntity<?> get() {
        List<NewsInDto> outDto = newsService.get();
        return ResponseEntity.ok(outDto);
    }

    @PostMapping("/news/getOne")
    public ResponseEntity<?> getOne(@RequestBody NewsInDto inDto) {
        NewsInDto outDto = newsService.getOne(inDto);
        return ResponseEntity.ok(outDto);
    }

    @PostMapping("/news/delete")
    public ResponseEntity<?> delete(@RequestBody NewsInDto inDto) {
        newsService.delete(inDto);
        return ResponseEntity.ok(new MessageResponse("Bạn đã xoá bài viết thành công!"));
    }

}
