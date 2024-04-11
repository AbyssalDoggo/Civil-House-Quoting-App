package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class QuotesDetailInDto {

    private String quotesId;

    private String detailNo;

    private String category;

    private String selectedCategory;

    private String coefficient;

    private String buildArea;

    private String cost;

}
