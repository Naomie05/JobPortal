package com.apple.JobBoard.controller;

import com.apple.JobBoard.model.JobSeeker;
import com.apple.JobBoard.model.JobSeekerPost;
import com.apple.JobBoard.service.JobSeekerPostService;
import com.apple.JobBoard.service.JobSeekerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v2/seeker/post")
public class JobSeekerPostController {

    @Autowired
    private JobSeekerPostService seekerPostService;
    @Autowired
    private JobSeekerService seekerService;

    @GetMapping(value = "/get")
    public List<JobSeekerPost> getJobSeekerPost() {

        return seekerPostService.getJobSeekerPost();
    }

    @GetMapping(value = "/user/{id}/get")
    public ResponseEntity<List<JobSeekerPost>> findPostByID(@PathVariable("id") long id) {
        final List<JobSeekerPost> posts = seekerPostService.findPostByJobSeekerID(id);
        return posts == null
                ? new ResponseEntity<>(HttpStatus.BAD_REQUEST)
                : new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PostMapping(value = "/user/{id}/create")
    public ResponseEntity<JobSeekerPost> createJobSeekerPost(@PathVariable("id") long id,
                                                             @RequestBody JobSeekerPost jobSeekerPost) {
        JobSeeker seeker = seekerService.getById(id);
        JobSeekerPost seekerPost = seekerPostService.createJobSeekerPost(jobSeekerPost, seeker.getId());
        return new ResponseEntity<>(seekerPost, HttpStatus.CREATED);
    }

    @PatchMapping(value = "/user/{id}/update")
    public ResponseEntity<JobSeekerPost> updateJobSeekerPostById(@PathVariable("id") long id, @RequestBody JobSeekerPost jobSeekerPost) throws Exception {
        JobSeekerPost seekerPost = seekerPostService.updateJobSeekerPostById(id, jobSeekerPost);
        return seekerPost == null
                ? new ResponseEntity<>(HttpStatus.BAD_REQUEST)
                : new ResponseEntity<>(seekerPost, HttpStatus.OK);
    }

    @DeleteMapping(value = "/user/{id}/delete")
    public ResponseEntity<?> deleteJobSeekerPostById(@PathVariable("id") long id) {
        boolean res = seekerPostService.deleteJobSeekerPostById(id);
        return res
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
