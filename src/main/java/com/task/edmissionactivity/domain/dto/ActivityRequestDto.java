package com.task.edmissionactivity.domain.dto;

import lombok.Data;

@Data
public class ActivityRequestDto {
    private String id;
    private String name;
    private String category;
    private String role;
    private String tier;
    private String description;
    private String impact;
    private Integer impactScore;
    private Integer hoursPerWeek;
    private Boolean isLeadership;
}