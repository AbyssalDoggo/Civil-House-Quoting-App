package com.example.controller;

import com.example.common.service.AbstractController;
import com.example.dto.packages.*;
import com.example.dto.response.MessageResponse;
import com.example.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PackageController extends AbstractController {

    private final PackageService packageService;

    @PostMapping("/package/savePackage")
    public ResponseEntity<?> savePackage(@RequestBody SavePackageDto savePackageDto) {
        for(PackageDto packageDto: savePackageDto.getPackageDtoList()){
            if(StringUtils.isBlank(packageDto.getPackageName())){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new MessageResponse("Bạn cần điền đầy đủ thông tin."));
            }
            if(StringUtils.isBlank(packageDto.getPackagePrice())){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new MessageResponse("Bạn cần điền đầy đủ thông tin."));
            }

            for(PackageDetailDto packageDetailDto: packageDto.getPackageDetail()){
                if(packageDetailDto.getPackageDetailName().equals("Tên vật tư")){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new MessageResponse("Bạn cần điền đầy đủ thông tin."));
                }
                if(packageDetailDto.getDetail().equals("Chi tiết vật tư")){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new MessageResponse("Bạn cần điền đầy đủ thông tin."));
                }
            }
        }
        packageService.savePackage(savePackageDto);
        return ResponseEntity.ok(new MessageResponse("Bạn đã lưu thông tin gói thành công!"));
    }

    @PostMapping("/package/savePackageType")
    public ResponseEntity<?> savePackageType(@RequestBody SavePackageTypeDto savePackageTypeDto) {
        for(PackageTypeDto packageTypeDto: savePackageTypeDto.getPackageType()){
            if(packageTypeDto.getPackageTypeName().equals("Tên mục")){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new MessageResponse("Bạn cần điền đầy đủ thông tin."));
            }
            for(PackageTypeDetailDto packageTypeDetailDto: packageTypeDto.getPackageTypeDetail()){
                if(packageTypeDetailDto.getTypeDetailName().equals("Loại mục")){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new MessageResponse("Bạn cần điền đầy đủ thông tin."));
                }
                if(packageTypeDetailDto.getCoefficient().equals("Hệ số")){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new MessageResponse("Bạn cần điền đầy đủ thông tin."));
                }
            }
        }
        packageService.savePackageType(savePackageTypeDto);
        return ResponseEntity.ok(new MessageResponse("Bạn đã lưu thông tin gói thành công!"));
    }

    @PostMapping("/package/getPackage")
    public ResponseEntity<?> getPackage() {
        SavePackageDto packageDtoList = packageService.getPackage();
        return ResponseEntity.ok(packageDtoList);
    }

    @PostMapping("/package/getPackageType")
    public ResponseEntity<?> getPackageType() {
        SavePackageTypeDto packageDtoList = packageService.getPackageType();
        return ResponseEntity.ok(packageDtoList);
    }

    @PostMapping("/package/save")
    public ResponseEntity<?> save(@RequestBody SaveInDto listInDto) {
        packageService.save(listInDto.getPackageDtoList());
        return ResponseEntity.ok(new MessageResponse("Bạn đã lưu thông tin gói thành công!"));
    }

    @PostMapping("/package/get")
    public ResponseEntity<?> get() {
        List<PackageDto> packageDtoList = packageService.get();
        return ResponseEntity.ok(packageDtoList);
    }
}
