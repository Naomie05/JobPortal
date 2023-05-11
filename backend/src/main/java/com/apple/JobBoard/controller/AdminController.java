package com.apple.JobBoard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apple.JobBoard.model.JobApplication;
import com.apple.JobBoard.model.JobPost;
import com.apple.JobBoard.model.JobRecruiter;
import com.apple.JobBoard.model.JobSeeker;
import com.apple.JobBoard.model.JobSeekerPost;
import com.apple.JobBoard.service.AdminService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v2/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    private final String SEEKER_NOT_FOUND = "Error: Job Seeker was not found";
    private final String RECRUITER_NOT_FOUND = "Error: Recruiter was not found";
    private final String JOB_POST_NOT_FOUND = "Error: Job Post was not found";
    private final String JOB_SEEKER_POST_NOT_FOUND = "Error: Job Seeker Post was not found";
    private final String JOB_APPLICATION_NOT_FOUND = "Error: Job Application was not found";

    @GetMapping(value = "/get/candidates")
    public ResponseEntity<List<JobSeeker>> getAllJobSeekers() {
        List<JobSeeker> jobSeekers = adminService.getAllJobSeekers();
        // deliberately not handling empty list, it's fine to return empty list I guess
        return new ResponseEntity<>(jobSeekers, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/candidate/{id}")
    public ResponseEntity<?> deleteJobSeekerById(@PathVariable("id") long id) {
        boolean res = adminService.deleteJobSeekerById(id);
        return res
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(this.SEEKER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/get/recruiters")
    public ResponseEntity<List<JobRecruiter>> getRecruiters() {
        List<JobRecruiter> users = adminService.getAllRrcruiters();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/recruiter/{id}")
    public ResponseEntity<?> deleteRecruiter(@PathVariable("id") long id) {
        boolean res = adminService.deleteRecruiterById(id);
        return res
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(this.RECRUITER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/get/job-posts")
    public ResponseEntity<List<JobPost>> getJobPosts() {
        List<JobPost> posts = adminService.getAllJobPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/job-post/{id}")
    public ResponseEntity<?> deleteJobPost(@PathVariable("id") long id) {
        boolean res = adminService.deleteJobPostById(id);
        return res
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(this.JOB_POST_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/get/seeker-posts")
    public ResponseEntity<List<JobSeekerPost>> getJobSeekerPosts() {
        List<JobSeekerPost> posts = adminService.getAllJobSeekerPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/seeker-post/{id}")
    public ResponseEntity<?> deleteJobSeekerPost(@PathVariable("id") long id) {
        boolean res = adminService.deleteJobSeekerPostById(id);
        return res
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(this.JOB_SEEKER_POST_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/get/job-applications")
    public ResponseEntity<List<JobApplication>> getJobApplications() {
        List<JobApplication> posts = adminService.getAllJobApplications();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/job-application/{id}")
    public ResponseEntity<?> deleteJobApplication(@PathVariable("id") long id) {
        boolean res = adminService.deleteJobApplicationById(id);
        return res
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(this.JOB_APPLICATION_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
}