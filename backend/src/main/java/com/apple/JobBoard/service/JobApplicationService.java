package com.apple.JobBoard.service;

import com.apple.JobBoard.exception.JobApplicationNotFoundException;
import com.apple.JobBoard.model.JobApplication;
import com.apple.JobBoard.model.JobPost;
import com.apple.JobBoard.model.JobRecruiter;
import com.apple.JobBoard.model.JobSeeker;
import com.apple.JobBoard.repository.JobApplicationRepo;
import com.apple.JobBoard.repository.JobPostRepo;
import com.apple.JobBoard.repository.JobRecruiterRepo;
import com.apple.JobBoard.repository.JobSeekerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jakarta.persistence.EntityManager;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class JobApplicationService {
	@Autowired
	private JobApplicationRepo appRepo;
	@Autowired
	private JobPostRepo postRepo;
	@Autowired
	private JobSeekerRepo seekerRepo;
	@Autowired
	private JobRecruiterRepo recruiterRepo;

	// @Cacheable(value = "job_applications", key = "#id")
	public List<JobApplication> getJobApplications() {
		return appRepo.findAll();
	}

	// @Cacheable(value = "job_application", key = "#id")
	public JobApplication getJobApplicationById(long id) {
		return appRepo.findById(id).orElseThrow(
				() -> new JobApplicationNotFoundException("Job application with id " + id + " was not found")
		);
	}

	public JobApplication getJobApplicationByPostId(long id) {
		return getJobApplications().stream().filter(o -> o.getPost().getId() == id).findAny().get();
	}

	// @CacheEvict(value = "job_application", key = "#id")
	public void deleteJobApplicationById(long id) {
		appRepo.deleteById(id);
	}

	public boolean isExistedById(long id) {
		return appRepo.findById(id).orElse(null) != null;
	}

	public void deleteJobApplicationByPostId(long id) {
		appRepo.deleteByJobPostId(id);
	}

	public JobApplication createJobApplication(long jobPostId, long jobSeekerId, JobApplication application) {
		Optional<JobPost> postOptional = postRepo.findById(jobPostId);
		Optional<JobSeeker> seekerOptional = seekerRepo.findById(jobSeekerId);
		if (postOptional.isEmpty() || seekerOptional.isEmpty()) {
			return null;
		}
		JobSeeker seeker = seekerOptional.get();
		JobPost post = postOptional.get();
		List<JobApplication> applications = seeker.getJobApplications();
		// prevent duplicate seeker applications
		if (applications.stream().anyMatch(j -> j.getPost().getId() == (post.getId()))) {
			return null;
		}
		// prevent duplicate applications
		List<JobApplication> existedApplications = getJobApplications()
				.stream()
				.filter(obj -> obj.getPost().getId() == jobPostId && obj.getUser().getId() == jobSeekerId)
				.toList();
		if (!existedApplications.isEmpty()) {
			return null;
		}

		application.setPost(post);
		application.setUser(seeker);
		application.setStatus("PENDING"); // default status
		appRepo.save(application);
		applications.add(application);
		seeker.setJobApplications(applications);
		seekerRepo.save(seeker);
		return application;
	}

	// @Cacheable(value = "job_application_by_seeker", key = "#jobSeekerId")
	public List<JobApplication> getJobApplicationBySeekerId(long jobSeekerId) {
		Optional<JobSeeker> seekerOptional = seekerRepo.findById(jobSeekerId);
		if (seekerOptional.isEmpty()) {
			return Collections.emptyList();
		}
		JobSeeker seeker = seekerOptional.get();
		return seeker.getJobApplications();
	}

	// @Cacheable(value = "job_application_by_recruiter", key = "#id")
	public List<JobApplication> getJobApplicationByRecruiterId(long recruiterId) {
		Optional<JobRecruiter> recruiterOptional = recruiterRepo.findById(recruiterId);
		if (recruiterOptional.isEmpty()) {
			return Collections.emptyList();
		}
		JobRecruiter recruiter = recruiterOptional.get();
		List<JobApplication> applications = getJobApplications();
		return applications
				.stream()
				.filter(j -> j.getPost().getRecruiter().getId() == (recruiter.getId()))
				.collect(Collectors.toList());
	}

	public JobApplication updateJobApplication(JobApplication json, long id){
		Optional<JobApplication> opt = appRepo.findById(id);
		if (opt.isEmpty()) {
			return null;
		}
		JobApplication existed = opt.get();
		if (json.getStatus() != null) {
			existed.setStatus(json.getStatus());
		}
		if (json.getInterviewLocation() != null) {
			existed.setInterviewLocation(json.getInterviewLocation());
		}
		existed.setInterviewAccepted(json.getInterviewAccepted());
		return appRepo.saveAndFlush(existed);
	}
	// public List<JobApplication> getJobApplicationByRecruiterId(long recruiterId)
	// {
	// Optional<JobRecruiter> recruiterOptional =
	// recruiterRepo.findById(recruiterId);
	// if (recruiterOptional.isEmpty()) {
	// return Collections.emptyList();
	// }
	//
	// JobRecruiter recruiter = recruiterOptional.get();
	// List<JobApplication> applications = getJobApplications();
	// Map<Long, List<JobApplication>> recruiterApplicationsMap = new HashMap<>();
	// for (JobApplication application : applications) {
	// long currentRecruiterId = application.getPost().getRecruiter().getId();
	// if (currentRecruiterId == recruiter.getId()) {
	// recruiterApplicationsMap.computeIfAbsent(
	// currentRecruiterId,
	// k -> new ArrayList<>())
	// .add(application);
	// }
	// }
	// return recruiterApplicationsMap.getOrDefault(recruiterId,
	// Collections.emptyList());
	// }
}