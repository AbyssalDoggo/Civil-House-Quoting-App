package com.example.controller;

import com.example.common.service.AbstractController;
import com.example.dac.dao.ImagesDao;
import com.example.dac.entity.Images;
import com.example.dto.ImagesDto;
import com.example.dto.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ImageController extends AbstractController {

    private final ImagesDao imagesDao;

    @PostMapping("/images/save")
    public ResponseEntity<?> save(@RequestBody ImagesDto imagesDto) {
        int i = 0;
        imagesDao.deleteByCondition();
        for(String item: imagesDto.getImageUrlList()){
            i++;
            Images images = new Images();
            images.setImageId(String.valueOf(i));
            images.setImageUrl(item);
            imagesDao.insert(images);
        }
        return ResponseEntity.ok(new MessageResponse("Bạn đã lưu thông tin thành công!"));
    }

    @PostMapping("/images/get")
    public ResponseEntity<?> get() {
        List<Images> selectAllImages = imagesDao.selectAllImages();
        List<String> imageUrlList = new ArrayList<>();
        for(Images item: selectAllImages){
            imageUrlList.add(item.getImageUrl());
        }
        ImagesDto imagesDto = new ImagesDto();
        imagesDto.setImageUrlList(imageUrlList);
        return ResponseEntity.ok(imagesDto);
    }

}
