package com.apple.JobBoard.controller;

import java.util.List;

import com.apple.JobBoard.model.JobPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.apple.JobBoard.model.JobApplication;
import com.apple.JobBoard.service.JobApplicationService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v2/job-application")
public class JobApplicationController {

    @Autowired
    private JobApplicationService service;

    @GetMapping(value = "/get")
    public List<JobApplication> getJobApplications() {
        return service.getJobApplications();
    }

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<JobApplication> getJobApplicationById(@PathVariable("id") long id) {
        JobApplication post = service.getJobApplicationById(id);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping(value = "/get/post/{id}")
    public ResponseEntity<JobApplication> getJobApplicationByPostId(@PathVariable("id") long id) {
        JobApplication post = service.getJobApplicationByPostId(id);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @PostMapping(value = "/create/{jobPostId}/seeker/{jobSeekerId}")
    public ResponseEntity<JobApplication> createJobApplication(
            @PathVariable("jobPostId") long jobPostId,
            @PathVariable("jobSeekerId") long jobSeekerId,
            @RequestBody JobApplication application) {
        JobApplication createdApplication = service.createJobApplication(jobPostId, jobSeekerId, application);
        if (createdApplication == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdApplication, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get/seeker/{id}")
    public ResponseEntity<List<JobApplication>> getBySeeker(@PathVariable("id") long id) {
        List<JobApplication> post = service.getJobApplicationBySeekerId(id);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping(value = "/get/recruiter/{id}")
    public ResponseEntity<List<JobApplication>> getByRecruiter(@PathVariable("id") long id) {
        List<JobApplication> post = service.getJobApplicationByRecruiterId(id);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @PatchMapping(value = "/update/{id}")
    public ResponseEntity<JobApplication> updateJobApplication(@PathVariable("id") long id, @RequestBody JobApplication req) {
        JobApplication app = service.updateJobApplication(req, id);
        return app != null
                ? new ResponseEntity<>(app, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}