package com.apple.JobBoard.controller;

import com.apple.JobBoard.model.request.SignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apple.JobBoard.model.request.LoginRequest;
import com.apple.JobBoard.service.AdminService;
import com.apple.JobBoard.service.JobRecruiterService;
import com.apple.JobBoard.service.JobSeekerService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v2/auth/users")
public class AuthController {

    @Autowired
    private JobSeekerService seekerService;
    @Autowired
    private JobRecruiterService recruiterService;
    @Autowired
    private AdminService adminService;

    @PostMapping(value = "/job-seeker/login")
    public ResponseEntity<?> jobSeekerLogin(@RequestBody LoginRequest request) {
        return seekerService.login(request);
    }

    @PostMapping(value = "/recruiter/login")
    public ResponseEntity<?> recruiterLogin(@RequestBody LoginRequest request) {
        return recruiterService.login(request);
    }

    @PostMapping(value = "/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {
        return adminService.login(request);
    }

    @PostMapping(value = "/job-seeker/signup")
    public ResponseEntity<?> jobSeekerSignup(@RequestBody SignupRequest request) {
        return seekerService.register(request);
    }

    @PostMapping(value = "/recruiter/signup")
    public ResponseEntity<?> recruiterSignup(@RequestBody SignupRequest request) {
        return recruiterService.register(request);
    }

    @PostMapping(value = "/admin/signup")
    public ResponseEntity<?> adminSignup(@RequestBody SignupRequest request) {
        return adminService.register(request);
    }
}