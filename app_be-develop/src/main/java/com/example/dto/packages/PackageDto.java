package com.example.dto.packages;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class PackageDto {

    private String id;

    private String packageName;

    private String packagePrice;

    private List<PackageDetailDto> packageDetail;

}
