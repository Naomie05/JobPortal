package com.apple.JobBoard.config;

import com.apple.JobBoard.model.*;
import com.apple.JobBoard.service.*;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JobRecruiterService recruiterService;
    @Autowired
    private JobSeekerService seekerService;
    @Autowired
    private AdminService adminService;

    private void authenticateUser(String userName, Class<?> userClass, UserDetailsService userDetailsService, JwtService jwtService,
                                  HttpServletRequest request) {

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails user = userDetailsService.loadUserByUsername(userName);
            if (userClass.isInstance(user) && jwtService.isTokenValid(request.getHeader(AUTHORIZATION).substring("Bearer ".length()), user)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        user.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader(AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring("Bearer ".length());
        String userName = jwtService.extractUsername(jwt);
        if (userName != null) {
            if (seekerService.existsByUsername(userName)) {
                authenticateUser(userName, JobSeeker.class, this.userDetailsService, jwtService, request);
            } else if (recruiterService.existsByUsername(userName)) {
                authenticateUser(userName, JobRecruiter.class, this.userDetailsService, jwtService, request);
            } else if (adminService.existsByUsername(userName)) {
                authenticateUser(userName, Admin.class, this.userDetailsService, jwtService, request);
            }
        }

        filterChain.doFilter(request, response);
    }

//    @Override
//    protected void doFilterInternal(@NonNull HttpServletRequest request,
//                                    @NonNull HttpServletResponse response,
//                                    @NonNull FilterChain filterChain)
//            throws ServletException, IOException {
//
//        final String authHeader = request.getHeader(AUTHORIZATION);
//        String jwt;
//        String userName;
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//        jwt = authHeader.substring("Bearer ".length());
//        userName = jwtService.extractUsername(jwt);
//        // early return if username not found
//        if (userName == null) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//        // handle the fact that we have two different users
//        if (seekerService.existsByUsername(userName)) {
//            if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                JobSeeker user = (JobSeeker) this.userDetailsService.loadUserByUsername(userName);
//                if (jwtService.isTokenValid(jwt, user)) {
//                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                            user,
//                            null,
//                            user.getAuthorities());
//                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authToken);
//                }
//            }
//        }
//        if (recruiterService.existsByUsername(userName)) {
//            if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                JobRecruiter user = (JobRecruiter) this.userDetailsService.loadUserByUsername(userName);
//                if (jwtService.isTokenValid(jwt, user)) {
//                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                            user,
//                            null,
//                            user.getAuthorities());
//                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authToken);
//                }
//            }
//        }
//        if (adminService.existsByUsername(userName)) {
//            if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                Admin user = (Admin) this.userDetailsService.loadUserByUsername(userName);
//                if (jwtService.isTokenValid(jwt, user)) {
//                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                            user,
//                            null,
//                            user.getAuthorities());
//                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authToken);
//                }
//            }
//        }
//        filterChain.doFilter(request, response);
//    }
}
