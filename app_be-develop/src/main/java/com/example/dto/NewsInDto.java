package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class NewsInDto {

    private String id;

    private String title;

    private String imageUrl;

    private String writtenBy;

    private String body;

    private String createdAt;

}
