package com.example.service;

import com.example.common.service.AbstractService;
import com.example.dac.dao.PackageDao;
import com.example.dac.dao.PackageDetailDao;
import com.example.dac.dao.PackageTypeDao;
import com.example.dac.dao.PackageTypeDetailDao;
import com.example.dac.entity.Package;
import com.example.dac.entity.PackageDetail;
import com.example.dac.entity.PackageType;
import com.example.dac.entity.PackageTypeDetail;
import com.example.dto.packages.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PackageService extends AbstractService {

  private final PackageDao packageDao;
  private final PackageDetailDao packageDetailDao;
  private final PackageTypeDao packageTypeDao;
  private final PackageTypeDetailDao packageTypeDetailDao;

  @Transactional(rollbackFor = Throwable.class)
  public void savePackage(SavePackageDto savePackageDto){
    packageDao.deleteByCondition();
    packageDetailDao.deleteByCondition();
    for(PackageDto inDto: savePackageDto.getPackageDtoList()){
      // package
      Package pack = new Package();
      pack.setPackageId(inDto.getId());
      pack.setPackageName(inDto.getPackageName());
      pack.setUnitPrice(inDto.getPackagePrice());
      packageDao.insert(pack);

      // package detail
      for(PackageDetailDto packageDetailDto : inDto.getPackageDetail()){
        PackageDetail packageDetailEntity = new PackageDetail();
        packageDetailEntity.setPackageId(inDto.getId());
        packageDetailEntity.setDetailNo(packageDetailDto.getDetailNo());
        packageDetailEntity.setPackageDetailName(packageDetailDto.getPackageDetailName());
        packageDetailEntity.setImage(packageDetailDto.getImage());
        packageDetailEntity.setDetail(packageDetailDto.getDetail());
        packageDetailDao.insert(packageDetailEntity);
      }
    }
  }

  public SavePackageDto getPackage(){
    List<Package> packageList = packageDao.selectAllPackage();
    List<PackageDto> packageDtoList = new ArrayList<>();
    for(Package packageItem: packageList) {
      PackageDto packageDto = new PackageDto();
      packageDto.setId(packageItem.getPackageId());
      packageDto.setPackageName(packageItem.getPackageName());
      packageDto.setPackagePrice(packageItem.getUnitPrice());

      // package detail
      List<PackageDetail> packageDetailList = packageDetailDao.selectAllPackageDetail(packageItem.getPackageId());
      List<PackageDetailDto> packageDetailDtoList = new ArrayList<>();
      for (PackageDetail packageDetailItem : packageDetailList) {
        PackageDetailDto packageDetailDto = new PackageDetailDto();
        packageDetailDto.setDetailNo(packageDetailItem.getDetailNo());
        packageDetailDto.setPackageDetailName(packageDetailItem.getPackageDetailName());
        packageDetailDto.setImage(packageDetailItem.getImage());
        packageDetailDto.setDetail(packageDetailItem.getDetail());
        packageDetailDtoList.add(packageDetailDto);
      }
      packageDto.setPackageDetail(packageDetailDtoList);
      packageDtoList.add(packageDto);
    }
    return new SavePackageDto().setPackageDtoList(packageDtoList);
  }

  @Transactional(rollbackFor = Throwable.class)
  public void savePackageType(SavePackageTypeDto savePackageTypeDto){
    packageTypeDao.deleteByCondition();
    packageTypeDetailDao.deleteByCondition();
    for(PackageTypeDto inDto: savePackageTypeDto.getPackageType()){
      // package type
      PackageType packageTypeEntity = new PackageType();
      packageTypeEntity.setPackageTypeId(inDto.getDetailNo());
      packageTypeEntity.setPackageTypeName(inDto.getPackageTypeName());
      packageTypeDao.insert(packageTypeEntity);

      // package type detail
      for(PackageTypeDetailDto packageTypeDetailDto: inDto.getPackageTypeDetail()){
        PackageTypeDetail packageTypeDetailEntity = new PackageTypeDetail();
        packageTypeDetailEntity.setPackageTypeId(inDto.getDetailNo());
        packageTypeDetailEntity.setDetailNo(packageTypeDetailDto.getDetailNo());
        packageTypeDetailEntity.setTypeDetailName(packageTypeDetailDto.getTypeDetailName());
        packageTypeDetailEntity.setCoefficient(packageTypeDetailDto.getCoefficient());
        packageTypeDetailDao.insert(packageTypeDetailEntity);
      }
    }
  }

  public SavePackageTypeDto getPackageType(){
    List<PackageType> packageTypeList = packageTypeDao.selectAllPackageType();
    List<PackageTypeDto> packageTypeDtoList = new ArrayList<>();
    for(PackageType packageTypeItem: packageTypeList){
      PackageTypeDto packageTypeDto = new PackageTypeDto();
      packageTypeDto.setDetailNo(packageTypeItem.getPackageTypeId());
      packageTypeDto.setPackageTypeName(packageTypeItem.getPackageTypeName());

      List<PackageTypeDetail> packageTypeDetailList = packageTypeDetailDao.selectAllPackageTypeDetail(packageTypeItem.getPackageTypeId());
      List<PackageTypeDetailDto> packageTypeDetailDtoList = new ArrayList<>();
      for(PackageTypeDetail packageTypeDetailItem: packageTypeDetailList){
        PackageTypeDetailDto packageTypeDetailDto = new PackageTypeDetailDto();
        packageTypeDetailDto.setDetailNo(packageTypeDetailItem.getDetailNo());
        packageTypeDetailDto.setTypeDetailName(packageTypeDetailItem.getTypeDetailName());
        packageTypeDetailDto.setCoefficient(packageTypeDetailItem.getCoefficient());
        packageTypeDetailDtoList.add(packageTypeDetailDto);
      }
      packageTypeDto.setPackageTypeDetail(packageTypeDetailDtoList);
      packageTypeDtoList.add(packageTypeDto);
    }
    return new SavePackageTypeDto().setPackageType(packageTypeDtoList);
  }

  @Transactional(rollbackFor = Throwable.class)
  public void save(List<PackageDto> listInDto) {
    for(PackageDto inDto: listInDto){
      // package
      packageDao.deleteByCondition();
      Package pack = new Package();
      pack.setPackageId(inDto.getId());
      pack.setPackageName(inDto.getPackageName());
      pack.setUnitPrice(inDto.getPackagePrice());
      packageDao.insert(pack);

      // package detail
      packageDetailDao.deleteByCondition();
      for(PackageDetailDto packageDetailDto : inDto.getPackageDetail()){
        PackageDetail packageDetailEntity = new PackageDetail();
        packageDetailEntity.setPackageId(inDto.getId());
        packageDetailEntity.setDetailNo(packageDetailDto.getDetailNo());
        packageDetailEntity.setPackageDetailName(packageDetailDto.getPackageDetailName());
        packageDetailEntity.setImage(packageDetailDto.getImage());
        packageDetailEntity.setDetail(packageDetailDto.getDetail());
        packageDetailDao.insert(packageDetailEntity);
      }

      // package type
      packageTypeDao.deleteByCondition();
//      for(PackageTypeDto packageTypeDto: inDto.getPackageType()){
//        PackageType packageTypeEntity = new PackageType();
////        packageTypeEntity.setPackageId(inDto.getId());
//        packageTypeEntity.setPackageTypeId(packageTypeDto.getDetailNo());
//        packageTypeEntity.setPackageTypeName(packageTypeDto.getPackageTypeName());
//        packageTypeDao.insert(packageTypeEntity);
//
//        // package type detail
//        packageTypeDetailDao.deleteByCondition();
//        for(PackageTypeDetailDto packageTypeDetailDto: packageTypeDto.getPackageTypeDetail()){
//          PackageTypeDetail packageTypeDetailEntity = new PackageTypeDetail();
////          packageTypeDetailEntity.setPackageId(inDto.getId());
//          packageTypeDetailEntity.setPackageTypeId(packageTypeDto.getDetailNo());
//          packageTypeDetailEntity.setDetailNo(packageTypeDetailDto.getDetailNo());
//          packageTypeDetailEntity.setTypeDetailName(packageTypeDetailDto.getTypeDetailName());
//          packageTypeDetailEntity.setCoefficient(packageTypeDetailDto.getCoefficient());
//          packageTypeDetailDao.insert(packageTypeDetailEntity);
//        }
//      }
    }
  }

  public List<PackageDto> get() {
    List<Package> packageList = packageDao.selectAllPackage();
    List<PackageDto> packageDtoList = new ArrayList<>();
    for(Package packageItem: packageList){
      PackageDto packageDto = new PackageDto();
      packageDto.setId(packageItem.getPackageId());
      packageDto.setPackageName(packageItem.getPackageName());
      packageDto.setPackagePrice(packageItem.getUnitPrice());

      // package detail
      List<PackageDetail> packageDetailList = packageDetailDao.selectAllPackageDetail(packageItem.getPackageId());
      List<PackageDetailDto> packageDetailDtoList = new ArrayList<>();
      for(PackageDetail packageDetailItem: packageDetailList){
        PackageDetailDto packageDetailDto = new PackageDetailDto();
        packageDetailDto.setDetailNo(packageDetailItem.getDetailNo());
        packageDetailDto.setPackageDetailName(packageDetailItem.getPackageDetailName());
        packageDetailDto.setImage(packageDetailItem.getImage());
        packageDetailDto.setDetail(packageDetailItem.getDetail());
        packageDetailDtoList.add(packageDetailDto);
      }
      packageDto.setPackageDetail(packageDetailDtoList);

      // package type
//      List<PackageType> packageTypeList = packageTypeDao.selectAllPackageType(packageItem.getPackageId());
//      List<PackageTypeDto> packageTypeDtoList = new ArrayList<>();
//      for(PackageType packageTypeItem: packageTypeList){
//        PackageTypeDto packageTypeDto = new PackageTypeDto();
//        packageTypeDto.setDetailNo(packageTypeItem.getPackageTypeId());
//        packageTypeDto.setPackageTypeName(packageTypeItem.getPackageTypeName());
//
//        List<PackageTypeDetail> packageTypeDetailList = packageTypeDetailDao.selectAllPackageTypeDetail(packageItem.getPackageId(), packageTypeItem.getPackageTypeId());
//        List<PackageTypeDetailDto> packageTypeDetailDtoList = new ArrayList<>();
//        for(PackageTypeDetail packageTypeDetailItem: packageTypeDetailList){
//          PackageTypeDetailDto packageTypeDetailDto = new PackageTypeDetailDto();
//          packageTypeDetailDto.setDetailNo(packageTypeDetailItem.getDetailNo());
//          packageTypeDetailDto.setTypeDetailName(packageTypeDetailItem.getTypeDetailName());
//          packageTypeDetailDto.setCoefficient(packageTypeDetailItem.getCoefficient());
//          packageTypeDetailDtoList.add(packageTypeDetailDto);
//        }
//        packageTypeDto.setPackageTypeDetail(packageTypeDetailDtoList);
//        packageTypeDtoList.add(packageTypeDto);
//      }
////      packageDto.setPackageType(packageTypeDtoList);
//      packageDtoList.add(packageDto);
    }
    return packageDtoList;
  }

}
