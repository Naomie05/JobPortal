package com.apple.JobBoard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apple.JobBoard.service.JobSeekerService;

import com.apple.JobBoard.model.JobSeeker;
import com.apple.JobBoard.model.request.SignupRequest;
import com.apple.JobBoard.model.JobApplication;
import com.apple.JobBoard.model.JobPost;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v2/job-seeker")
public class JobSeekerController {

    @Autowired
    private JobSeekerService seekerService;

    @GetMapping(value = "/get")
    public List<JobSeeker> getAllusers() {
        return seekerService.getAllusers();
    }

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<JobSeeker> getById(@PathVariable("id") long id)
            throws Exception {
        // just to get the whole new record in the json response
        JobSeeker u = seekerService.getById(id);
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteJobSeeker(@PathVariable("id") long id) {
        seekerService.deleteJobSeeker(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping(value = "/{id}/profile/create")
    public ResponseEntity<JobSeeker> createProfile(@PathVariable("id") long id, @RequestBody JobSeeker request)
            throws Exception {
        // just to get the whole new record in the json response
        JobSeeker u = seekerService.createProfile(id, request);
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

    @PatchMapping(value = "/{id}/profile/update")
    public ResponseEntity<JobSeeker> updateProfile(@PathVariable("id") long id, @RequestBody JobSeeker request)
            throws Exception {
        // just to get the whole new record in the json response
        JobSeeker u = seekerService.updateProfile(id, request);
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

    @PostMapping(value = "/{user_id}/save/job-post/{job_id}")
    public ResponseEntity<?> saveJobPost(@PathVariable("job_id") long jobId, @PathVariable("user_id") Long userId) {
        boolean res = seekerService.saveJobPost(jobId, userId);
        return res
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping(value = "/{user_id}/delete/job-post/{job_id}")
    public ResponseEntity<?> deleteSavedJobPost(@PathVariable("job_id") long jobId,
                                                @PathVariable("user_id") long userId) {
        boolean res = seekerService.deleteSavedJobPost(jobId, userId);
        return res
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/{user_id}/get/job-posts")
    public ResponseEntity<?> getSavedJobs(@PathVariable("user_id") long userId) {
        List<JobPost> list = seekerService.getInteresteJobPosts(userId);
        return list != null
                ? new ResponseEntity<>(list, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/{user_id}/get/job_applications")
    public ResponseEntity<?> getAppliedJobApplications(@PathVariable("user_id") long userId) {
        List<JobApplication> list = seekerService.getAppliedJobApplications(userId);
        return list != null
                ? new ResponseEntity<>(list, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}