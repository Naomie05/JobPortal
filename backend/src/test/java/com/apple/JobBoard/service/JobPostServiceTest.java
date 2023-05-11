package com.apple.JobBoard.service;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.apple.JobBoard.model.JobPost;
import com.apple.JobBoard.model.JobRecruiter;
import com.apple.JobBoard.repository.JobPostRepo;
import com.apple.JobBoard.repository.JobRecruiterRepo;
import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;

import io.jsonwebtoken.lang.Arrays;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
//@WebMvcTest(value = JobPostService.class)
//@ContextConfiguration(classes = JobPostService.class)
//@WithMockUser
public class JobPostServiceTest {
    @InjectMocks
    private JobPostService jobPostService;
    @Mock
    private JobPostRepo postRepo;
    @Mock
    private JobRecruiterRepo recruiterRepo;
    private JobRecruiter recruiter;
    private JobPost jobPost;

    @BeforeEach
    void setup() {
        System.out.println("start testing JobPostService");
        recruiter = new JobRecruiter();
        Date createdTime = new Date(System.currentTimeMillis());
        List<String> list = List.of("TAG1", "TAG2");
        jobPost = new JobPost(
                recruiter,
                "Software Engineer",
                "Develop software applications",
                120000.0,
                "Design, code, and test software",
                "5 years experience, Java, Spring",
                "New York, NY",
                "Full-time",
                "Open",
                list,
                createdTime); //Arrays.list("Java"));

    }

    @AfterEach
    void over() {
        System.out.println("JobPostService test is over");
    }

    @Test
    void testAddJobPost() {
        when(postRepo.save(any(JobPost.class))).thenReturn(jobPost);

        JobPost post = jobPostService.addJobPost(jobPost);

        assertThat(post).isNotNull();
        assertThat(post.getTitle()).isEqualTo("Software Engineer");
        verify(postRepo, times(1)).save(jobPost);
    }

    @Test
    void testCreateJobPost() {
        when(recruiterRepo.findById(1L)).thenReturn(Optional.of(recruiter));
        when(postRepo.save(any(JobPost.class))).thenReturn(jobPost);

        JobPost post = jobPostService.createJobPost(jobPost, 1L);

        assertThat(post).isNotNull();
        assertThat(post.getRecruiter()).isEqualTo(recruiter);
        assertThat(post.getTitle()).isEqualTo("Software Engineer");
        verify(recruiterRepo, times(1)).findById(1L);
    }


    @Test
    void testGetJobPostById() {
        when(postRepo.findJobPostById(1L)).thenReturn(Optional.of(jobPost));

        JobPost post = jobPostService.getJobPostById(1L);

        assertThat(post).isNotNull();
        assertThat(post.getTitle()).isEqualTo("Software Engineer");
        verify(postRepo, times(1)).findJobPostById(1L);
    }

    @Test
    void testUpdateJobPostById() {

    }
}
