package com.task.edmissionactivity.domain.controller;

import com.task.edmissionactivity.domain.dto.ActivityRequestDto;
import com.task.edmissionactivity.domain.entity.Activity;
import com.task.edmissionactivity.domain.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ActivityController {

    private final ActivityService activityService;

    /**
     * Save all activities
     */
    @PostMapping("/activities")
    public ResponseEntity<?> saveAllActivities(@RequestBody List<ActivityRequestDto> requests) {

        List<Activity> activities = requests.stream().map(req -> Activity.builder()
                .localId(req.getId())
                .name(req.getName())
                .category(req.getCategory())
                .role(req.getRole())
                .tier(req.getTier())
                .description(req.getDescription())
                .impact(req.getImpact())
                .impactScore(req.getImpactScore())
                .hoursPerWeek(req.getHoursPerWeek())
                .isLeadership(req.getIsLeadership())
                .build()
        ).collect(Collectors.toList());

        List<Activity> saved = activityService.saveAllActivities(activities);
        return ResponseEntity.ok(saved);
    }


}