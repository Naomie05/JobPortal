package com.apple.JobBoard.service;

import org.junit.jupiter.api.Test;
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
import com.apple.JobBoard.model.JobSeeker;
import com.apple.JobBoard.model.JobSeekerPost;
import com.apple.JobBoard.repository.JobPostRepo;
import com.apple.JobBoard.repository.JobRecruiterRepo;
import com.apple.JobBoard.repository.JobSeekerPostRepo;
import com.apple.JobBoard.repository.JobSeekerRepo;
import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;

import io.jsonwebtoken.lang.Arrays;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@ExtendWith(MockitoExtension.class)
public class JobSeekerPostServiceTest {
    @Mock
    private JobSeekerPostRepo seekerPostRepo;

    @Mock
    private JobSeekerRepo seekerRepo;

    @InjectMocks
    private JobSeekerPostService jobSeekerPostService;

    private JobSeeker jobSeeker;
    private JobSeekerPost jobSeekerPost;

    @BeforeEach
    public void setUp() {
        List <String> list1 = List.of("TAG1","TAG2");
        List <String> list2 = List.of("TAG1","TAG2");
        jobSeeker = new JobSeeker();
        jobSeeker.setId(1L);

        jobSeekerPost = new JobSeekerPost(jobSeeker, "Software Developer", "Seeking a Software Developer position",
                list1, list2, "Java, Spring, AWS");
        jobSeekerPost.setId(1L);
    }
    @Test
    void testCreateJobSeekerPost() {
        when(seekerRepo.findById(1L)).thenReturn(Optional.of(jobSeeker));
        when(seekerPostRepo.save(any(JobSeekerPost.class))).thenReturn(jobSeekerPost);

        JobSeekerPost result = jobSeekerPostService.createJobSeekerPost(jobSeekerPost, 1L);
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(jobSeekerPost.getId());
        assertThat(result.getSeeker().getId()).isEqualTo(jobSeeker.getId());

        verify(seekerRepo, times(1)).findById(1L);
        verify(seekerPostRepo, times(1)).save(any(JobSeekerPost.class));
    
    }

    @Test
    void testDeleteJobSeekerPost() {
        doNothing().when(seekerPostRepo).deleteById(anyLong());
        jobSeekerPostService.deleteJobSeekerPost(1L);
        verify(seekerPostRepo, times(1)).deleteById(1L);
    }

    @Test
    void testFindPostByJobSeekerID() {
        List<JobSeekerPost> posts = new ArrayList<>();
        posts.add(jobSeekerPost);
        when(seekerPostRepo.findAll()).thenReturn(posts);

        List<JobSeekerPost> result = jobSeekerPostService.findPostByJobSeekerID(1L);
        assertThat(result).isNotNull();
        assertThat(result.size()).isEqualTo(1);
        assertThat(result.get(0).getId()).isEqualTo(jobSeekerPost.getId());

        verify(seekerPostRepo, times(1)).findAll();
    
    }

    @Test
    void testGetJobSeekerPost() {
        List<JobSeekerPost> posts = new ArrayList<>();
        posts.add(jobSeekerPost);
        when(seekerPostRepo.findAll()).thenReturn(posts);

        List<JobSeekerPost> result = jobSeekerPostService.getJobSeekerPost();
        assertThat(result).isNotNull();
        assertThat(result.size()).isEqualTo(1);
        assertThat(result.get(0).getId()).isEqualTo(jobSeekerPost.getId());

        verify(seekerPostRepo, times(1)).findAll();
    }

    @Test
    void testGetJobSeekerPostById() {
        when(seekerPostRepo.findJobSeekerPostById(1L)).thenReturn(Optional.of(jobSeekerPost));

        JobSeekerPost result = jobSeekerPostService.getJobSeekerPostById(1L);
        verify(seekerPostRepo, times(1)).findJobSeekerPostById(1L);
    }

    @Test
    void testUpdateJobSeekerPostById() {
        when(seekerPostRepo.findById(1L)).thenReturn(Optional.of(jobSeekerPost));
        when(seekerPostRepo.saveAndFlush(any(JobSeekerPost.class))).thenReturn(jobSeekerPost);

        JobSeekerPost updatedPost = new JobSeekerPost(jobSeeker, "Updated Title", "Updated Description",
                null, null, "Updated Skills");
        JobSeekerPost result = jobSeekerPostService.updateJobSeekerPostById(1L, updatedPost);

        verify(seekerPostRepo, times(1)).findById(1L);
        verify(seekerPostRepo, times(1)).saveAndFlush(any(JobSeekerPost.class));
    }
}
