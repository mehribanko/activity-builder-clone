package com.task.edmissionactivity.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dbId;
    private String localId;
    private String name;
    private String category;
    private String role;
    private String tier;
    @Column(length = 2000)
    private String description;
    private String impact;
    private Integer impactScore;
    private Integer hoursPerWeek;
    private Boolean isLeadership;
}