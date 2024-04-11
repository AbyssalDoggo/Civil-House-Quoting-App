package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class ProjectsInDto {

    private String id;

    private String title;

    private String architect;

    private String area;

    private String year;

    private String imageUrl;

    private String body;

}
