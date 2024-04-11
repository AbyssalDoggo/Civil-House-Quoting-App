package com.example.controller;

import com.example.common.service.AbstractController;
import com.example.dto.ProjectsInDto;
import com.example.dto.response.MessageResponse;
import com.example.service.ProjectsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ProjectsController extends AbstractController {

    private final ProjectsService projectsService;

    @PostMapping("/projects/save")
    public ResponseEntity<?> save(@RequestBody ProjectsInDto inDto) {
        projectsService.save(inDto);
        return ResponseEntity.ok(new MessageResponse("Bạn đã lưu thành công!"));
    }

    @PostMapping("/projects/get")
    public ResponseEntity<?> get() {
        List<ProjectsInDto> outDto = projectsService.get();
        return ResponseEntity.ok(outDto);
    }

    @PostMapping("/projects/getOne")
    public ResponseEntity<?> getOne(@RequestBody ProjectsInDto inDto) {
        ProjectsInDto outDto = projectsService.getOne(inDto);
        return ResponseEntity.ok(outDto);
    }

    @PostMapping("/projects/delete")
    public ResponseEntity<?> delete(@RequestBody ProjectsInDto inDto) {
        projectsService.delete(inDto);
        return ResponseEntity.ok(new MessageResponse("Bạn đã xoá thành công!"));
    }
}
