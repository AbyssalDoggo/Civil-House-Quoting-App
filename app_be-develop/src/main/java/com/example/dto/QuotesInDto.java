package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class QuotesInDto {

    private String key;

    private String id;

    private String quotesId;

    private String userName;

    private String userPhoneNumber;

    // Diện tích đất
    private String projectLandArea;

    // Diện tích xây dựng
    private String projectBuildArea;

    // Số tầng
    private String projectFloor;

    // Loại gói
    private String selectedPackage;

    // Đơn giá
    private String unitPrice;

    // Tổng diện tích sàn
    private String totalFloorArea;

    // Tổng cộng
    private String totalPrice;

    private String createDatetime;

    private List<QuotesDetailInDto> quotesDetail;

}
