package com.example.dto.packages;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class PackageTypeDetailDto {

    private String detailNo;

    private String typeDetailName;

    private String coefficient;

}
