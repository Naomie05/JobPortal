package com.apple.JobBoard.controller;

import com.apple.JobBoard.model.JobPost;
import com.apple.JobBoard.model.JobRecruiter;
import com.apple.JobBoard.service.JobPostService;
import com.apple.JobBoard.service.JobRecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v2/job-post")
public class JobPostController {

    @Autowired
    private JobPostService postService;

    @Autowired
    private JobRecruiterService recruiterService;

    @GetMapping(value = "/get")
    public List<JobPost> getJobPost() {
        return postService.getJobPosts();
    }

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<JobPost> getJobPostById(@PathVariable("id") long id) {
        JobPost jobPost = postService.getJobPostById(id);
        return new ResponseEntity<>(jobPost, HttpStatus.OK);
    }

    @GetMapping(value = "/user/{id}/get")
    public ResponseEntity<List<JobPost>> findJobPostByRecruiterID(@PathVariable("id") long id) {
        final List<JobPost> posts = postService.findJobPostByRecruiterID(id);
        return posts == null
                ? new ResponseEntity<>(HttpStatus.BAD_REQUEST)
                : new ResponseEntity<>(posts,
                HttpStatus.OK);
    }

    @PostMapping(value = "/user/{id}/add")
    public ResponseEntity<JobPost> addJobPost(@RequestBody JobPost jobPost) {
        JobPost post = postService.addJobPost(jobPost);
        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }

    @PostMapping(value = "/user/{id}/create")
    public ResponseEntity<JobPost> createJobPost(@PathVariable("id") long id, @RequestBody JobPost jobPost) {
        JobRecruiter recruiter = recruiterService.getById(id);
        JobPost post = postService.createJobPost(jobPost, recruiter.getId());
        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }

    @PatchMapping(value = "/user/{id}/update")
    public ResponseEntity<JobPost> updateJobPostById(@PathVariable("id") long id, @RequestBody JobPost jobPost) {
        JobPost post = postService.updateJobPostById(id, jobPost);
        return post == null
                ? new ResponseEntity<>(HttpStatus.BAD_REQUEST)
                : new ResponseEntity<>(post, HttpStatus.OK);
    }
}