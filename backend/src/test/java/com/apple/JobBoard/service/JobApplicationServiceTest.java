package com.apple.JobBoard.service;

import org.junit.jupiter.api.Test;
import com.apple.JobBoard.model.JobApplication;
import com.apple.JobBoard.model.JobPost;
import com.apple.JobBoard.model.JobRecruiter;
import com.apple.JobBoard.model.JobSeeker;
import com.apple.JobBoard.repository.JobApplicationRepo;
import com.apple.JobBoard.repository.JobPostRepo;
import com.apple.JobBoard.repository.JobRecruiterRepo;
import com.apple.JobBoard.repository.JobSeekerRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class JobApplicationServiceTest {
    @InjectMocks
    private JobApplicationService jobApplicationService;
    @Mock
    private JobApplicationRepo jobApplicationRepo;
    @Mock
    private JobPostRepo jobPostRepo;
    @Mock
    private JobSeekerRepo jobSeekerRepo;
    @Mock
    private JobRecruiterRepo jobRecruiterRepo;
    private JobApplication testJobApplication;
    private JobPost testJobPost;
    private JobSeeker testJobSeeker;

    @BeforeEach
    public void setUp() {
        testJobPost = new JobPost();
        testJobSeeker = new JobSeeker();
        testJobApplication = new JobApplication(1L, testJobPost, testJobSeeker, "PENDING", "Test Location", false);
    }

    @Test
    void testCreateJobApplication() {
        // Set up test data
        JobPost jobPost = new JobPost();
        jobPost.setId(1L);

        JobSeeker jobSeeker = new JobSeeker();
        jobSeeker.setId(1L);
        List<JobApplication> jobApplications = new ArrayList<>();
        jobSeeker.setJobApplications(jobApplications);

        JobApplication jobApplication = new JobApplication();
        jobApplication.setUser(jobSeeker);
        jobApplication.setPost(jobPost);

        when(jobPostRepo.findById(anyLong())).thenReturn(Optional.of(jobPost));
        when(jobSeekerRepo.findById(anyLong())).thenReturn(Optional.of(jobSeeker));
        when(jobApplicationRepo.save(any(JobApplication.class))).thenReturn(jobApplication);


        JobApplication result = jobApplicationService.createJobApplication(1L, 1L, jobApplication);


        assertNotNull(result);
        assertEquals(jobApplication, result);


        verify(jobApplicationRepo, times(1)).save(any(JobApplication.class));


        verify(jobSeekerRepo, times(1)).save(any(JobSeeker.class));
        assertEquals(1, jobApplications.size());
        assertTrue(jobApplications.contains(jobApplication));
//        when(jobPostRepo.findById(anyLong())).thenReturn(Optional.of(testJobPost));
//        when(jobSeekerRepo.findById(anyLong())).thenReturn(Optional.of(testJobSeeker));
//        when(jobApplicationRepo.save(any(JobApplication.class))).thenReturn(testJobApplication);
//
//        JobApplication result = jobApplicationService.createJobApplication(1L, 1L, testJobApplication);
//
//        assertEquals(testJobApplication, result);
//        verify(jobPostRepo, times(1)).findById(anyLong());
//        verify(jobSeekerRepo, times(1)).findById(anyLong());
//        verify(jobApplicationRepo, times(1)).save(any(JobApplication.class));
    }

    @Test
    void testDeleteJobApplicationById() {
        doNothing().when(jobApplicationRepo).deleteById(1L);

        jobApplicationService.deleteJobApplicationById(1L);

        verify(jobApplicationRepo, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteJobApplicationByPostId() {
        doNothing().when(jobApplicationRepo).deleteByJobPostId(1L);

        jobApplicationService.deleteJobApplicationByPostId(1L);

        verify(jobApplicationRepo, times(1)).deleteByJobPostId(1L);
    }

    @Test
    void testGetJobApplicationById() {
        when(jobApplicationRepo.findById(1L)).thenReturn(Optional.of(testJobApplication));

        JobApplication result = jobApplicationService.getJobApplicationById(1L);

        assertEquals(testJobApplication, result);
        verify(jobApplicationRepo, times(1)).findById(1L);
    }

    @Test
    void testGetJobApplicationByPostId() {
        JobPost jobPost = new JobPost();
        jobPost.setId(1L);

        JobApplication jobApplication1 = new JobApplication(1L, jobPost, null, "PENDING", "Location1", false);
        JobApplication jobApplication2 = new JobApplication(2L, jobPost, null, "PENDING", "Location2", false);

        List<JobApplication> jobApplications = Arrays.asList(jobApplication1, jobApplication2);
        when(jobApplicationRepo.findAll()).thenReturn(jobApplications);

        JobApplication result = jobApplicationService.getJobApplicationByPostId(1L);

        assertEquals(jobApplication1, result);
        verify(jobApplicationRepo, times(1)).findAll();
    }

    @Test
    void testGetJobApplicationByRecruiterId() {
        JobRecruiter recruiter = new JobRecruiter();
        recruiter.setId(1L);

        JobPost jobPost = new JobPost();
        jobPost.setId(1L);
        jobPost.setRecruiter(recruiter);

        JobApplication jobApplication1 = new JobApplication(1L, jobPost, null, "PENDING", "Location1", false);
        JobApplication jobApplication2 = new JobApplication(2L, jobPost, null, "PENDING", "Location2", false);

        List<JobApplication> jobApplications = Arrays.asList(jobApplication1, jobApplication2);
        when(jobApplicationRepo.findAll()).thenReturn(jobApplications);
        when(jobRecruiterRepo.findById(1L)).thenReturn(Optional.of(recruiter));

        List<JobApplication> result = jobApplicationService.getJobApplicationByRecruiterId(1L);

        assertEquals(2, result.size());
        assertTrue(result.contains(jobApplication1));
        assertTrue(result.contains(jobApplication2));
        verify(jobApplicationRepo, times(1)).findAll();
        verify(jobRecruiterRepo, times(1)).findById(1L);
    }

    @Test
    void testGetJobApplicationBySeekerId() {
        JobSeeker jobSeeker = new JobSeeker();
        jobSeeker.setId(1L);

        JobPost jobPost = new JobPost();
        jobPost.setId(1L);

        JobApplication jobApplication1 = new JobApplication(1L, jobPost, jobSeeker, "PENDING", "Location1", false);
        JobApplication jobApplication2 = new JobApplication(2L, jobPost, jobSeeker, "PENDING", "Location2", false);

        List<JobApplication> jobApplications = Arrays.asList(jobApplication1, jobApplication2);
        jobSeeker.setJobApplications(jobApplications);

        when(jobSeekerRepo.findById(1L)).thenReturn(Optional.of(jobSeeker));

        List<JobApplication> result = jobApplicationService.getJobApplicationBySeekerId(1L);

        assertEquals(2, result.size());
        assertTrue(result.contains(jobApplication1));
        assertTrue(result.contains(jobApplication2));
        verify(jobSeekerRepo, times(1)).findById(1L);
    }

    @Test
    void testGetJobApplications() {
        JobSeeker jobSeeker = new JobSeeker();
        jobSeeker.setId(1L);

        JobPost jobPost = new JobPost();
        jobPost.setId(1L);

        JobApplication jobApplication1 = new JobApplication(1L, jobPost, jobSeeker, "PENDING", "Location1", false);
        JobApplication jobApplication2 = new JobApplication(2L, jobPost, jobSeeker, "PENDING", "Location2", false);

        List<JobApplication> jobApplications = Arrays.asList(jobApplication1, jobApplication2);

        when(jobApplicationRepo.findAll()).thenReturn(jobApplications);

        List<JobApplication> result = jobApplicationService.getJobApplications();

        assertEquals(2, result.size());
        assertTrue(result.contains(jobApplication1));
        assertTrue(result.contains(jobApplication2));
        verify(jobApplicationRepo, times(1)).findAll();
    }

    @Test
    void testIsExistedById() {
        JobSeeker jobSeeker = new JobSeeker();
        jobSeeker.setId(1L);

        JobPost jobPost = new JobPost();
        jobPost.setId(1L);

        JobApplication jobApplication1 = new JobApplication(1L, jobPost, jobSeeker, "PENDING", "Location1", false);

        when(jobApplicationRepo.findById(1L)).thenReturn(Optional.of(jobApplication1));
        when(jobApplicationRepo.findById(2L)).thenReturn(Optional.empty());

        assertTrue(jobApplicationService.isExistedById(1L));
        assertFalse(jobApplicationService.isExistedById(2L));

        verify(jobApplicationRepo, times(1)).findById(1L);
        verify(jobApplicationRepo, times(1)).findById(2L);
    }

    @Test
    void testUpdateJobApplication() {
        JobSeeker jobSeeker = new JobSeeker();
        jobSeeker.setId(1L);

        JobPost jobPost = new JobPost();
        jobPost.setId(1L);

        JobApplication existingJobApplication = new JobApplication(1L, jobPost, jobSeeker, "PENDING", "Location1", false);
        JobApplication updatedJobApplication = new JobApplication(1L, jobPost, jobSeeker, "ACCEPTED", "Location1", true);

        when(jobApplicationRepo.findById(1L)).thenReturn(Optional.of(existingJobApplication));
        when(jobApplicationRepo.saveAndFlush(any(JobApplication.class))).thenReturn(updatedJobApplication);

        JobApplication json = new JobApplication();
        json.setStatus("ACCEPTED");
        json.setInterviewAccepted(true);

        JobApplication result = jobApplicationService.updateJobApplication(json, 1L);

        assertEquals("ACCEPTED", result.getStatus());
        assertEquals("Location1", result.getInterviewLocation());
        assertTrue(result.getInterviewAccepted());

        verify(jobApplicationRepo, times(1)).findById(1L);
        verify(jobApplicationRepo, times(1)).saveAndFlush(any(JobApplication.class));
    }
}
