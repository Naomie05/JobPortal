package com.apple.JobBoard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.apple.JobBoard.repository.AdminRepo;
import com.apple.JobBoard.repository.JobRecruiterRepo;
import com.apple.JobBoard.repository.JobSeekerRepo;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private JobRecruiterRepo recruiterRepo;
    @Autowired
    private JobSeekerRepo seekerRepo;
    @Autowired
    private AdminRepo adminRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return seekerRepo.existsByUsername(username)
                ? seekerRepo.findByUsername(username)
                : recruiterRepo.existsByUsername(username)
                ? recruiterRepo.findByUsername(username)
                : adminRepo.findByUsername(username);
    }
}