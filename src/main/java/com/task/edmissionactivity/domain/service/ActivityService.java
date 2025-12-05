package com.task.edmissionactivity.domain.service;

import com.task.edmissionactivity.domain.entity.Activity;
import com.task.edmissionactivity.domain.repo.ActivityRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    private final ActivityRepository repository;

    @Autowired
    public ActivityService(ActivityRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public List<Activity> saveAllActivities(List<Activity> activities) {
        return repository.saveAll(activities);
    }

    public List<Activity> getAllActivities() {
        return repository.findAll();
    }
}