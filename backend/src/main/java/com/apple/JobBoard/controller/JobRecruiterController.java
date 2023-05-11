package com.apple.JobBoard.controller;

import com.apple.JobBoard.model.JobRecruiter;
import com.apple.JobBoard.model.JobSeekerPost;
import com.apple.JobBoard.model.request.SignupRequest;
import com.apple.JobBoard.service.JobRecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v2/recruiter")
public class JobRecruiterController {

    @Autowired
    private JobRecruiterService recruiterService;

    @GetMapping(value = "/get")
    public List<JobRecruiter> getAllusers() {
        return recruiterService.getAllusers();
    }

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<JobRecruiter> getById(@PathVariable("id") long id)
            throws Exception {
        // just to get the whole new record in the json response
        JobRecruiter u = recruiterService.getById(id);
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

    @PatchMapping(value = "/{id}/profile/create")
    public ResponseEntity<JobRecruiter> createProfile(@PathVariable("id") long id, @RequestBody JobRecruiter request)
            throws Exception {
        // just to get the whole new record in the json response
        JobRecruiter u = recruiterService.createProfile(id, request);
        return new ResponseEntity<>(u, HttpStatus.CREATED);
    }

    @PatchMapping(value = "/{id}/profile/update")
    public ResponseEntity<JobRecruiter> updateProfile(@PathVariable("id") long id, @RequestBody JobRecruiter request)
            throws Exception {
        // just to get the whole new record in the json response
        JobRecruiter u = recruiterService.updateProfile(id, request);
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

    @PostMapping(value = "/{user_id}/save/seeker-post/{post_id}")
    public ResponseEntity<?> saveCandidate(@PathVariable("post_id") long postID, @PathVariable("user_id") long userId) {
        boolean res = recruiterService.saveCandidate(postID, userId);
        return res
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/{user_id}/get/seeker-posts")
    public ResponseEntity<?> getSavedCandidates(@PathVariable("user_id") long userId) {
        List<JobSeekerPost> list = recruiterService.getSavedCandidates(userId);
        return list != null
                ? new ResponseEntity<>(list, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}