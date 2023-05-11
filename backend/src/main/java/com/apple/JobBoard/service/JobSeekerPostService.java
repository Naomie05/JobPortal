package com.apple.JobBoard.service;

import com.apple.JobBoard.exception.JobPostNotFoundException;
import com.apple.JobBoard.model.*;
import com.apple.JobBoard.repository.JobRecruiterRepo;
import com.apple.JobBoard.repository.JobSeekerPostRepo;
import com.apple.JobBoard.repository.JobSeekerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobSeekerPostService {

	@Autowired
	private JobSeekerPostRepo seekerPostRepo;

	@Autowired
	private JobSeekerRepo seekerRepo;

	@Autowired
	private JobRecruiterRepo recruiterService;

	@Autowired
	private ResumeService resumeService;

	// @Cacheable
	public List<JobSeekerPost> getJobSeekerPost() {
		return seekerPostRepo.findAll();
	}

	public JobSeekerPost createJobSeekerPost(JobSeekerPost jobSeekerPost, long id) {
		JobSeeker jobSeeker = seekerRepo.findById(id).get();
		List<JobSeekerPost> posts = getJobSeekerPost();
		// prevent multiple posts
		if (posts.stream().anyMatch(j -> j.getSeeker().getId() == (jobSeeker.getId()))) {
			return null;
		}
		jobSeekerPost.setSeeker(jobSeeker);
		return seekerPostRepo.save(jobSeekerPost);
	}

	// @Cacheable(value = "job_seeker_posts", key = "#id")
	public List<JobSeekerPost> findPostByJobSeekerID(long id) {
		List<JobSeekerPost> list = getJobSeekerPost();
		return list.stream()
				.filter(post -> post.getSeeker().getId() == id)
				.collect(Collectors.toList());
	}

	@Transactional
	public boolean deleteJobSeekerPostById(long id) {
		JobSeekerPost post = seekerPostRepo.findById(id).get();
		if (!isExistedById(post.getId())){
			return false;
		}
		Resume resume = resumeService.findResumeBySeekerID(post.getSeeker().getId());
		resumeService.deleteById(resume.getId());
		List<JobRecruiter> users = recruiterService.findAll();
		users.forEach(u -> {
			u.getCandidates().removeIf(p -> p.getId() == post.getId());
		});
		List<JobSeekerPost> list = findPostByJobSeekerID(post.getSeeker().getId());
		list.forEach(p -> deleteJobSeekerPost(p.getId()));
		return true;
	}

	// @CacheEvict(value = "job_seeker_posts", key = "#id")
	public void deleteJobSeekerPost(long id) {
		seekerPostRepo.deleteById(id);
	}

	public boolean isExistedById(long id) {
		return seekerPostRepo.findById(id).orElse(null) != null;
	}

	public JobSeekerPost updateJobSeekerPostById(long id, JobSeekerPost jobSeekerPost) {
//		if (seekerPostRepo.findById(id).isEmpty()) {
//			return null;
//		}
		Optional<JobSeekerPost> opt = seekerPostRepo.findById(id);
		if (opt.isEmpty()) {
			return null;
		}
		JobSeekerPost existed = opt.get();
		if (jobSeekerPost.getTitle() != null) {
			existed.setTitle(jobSeekerPost.getTitle());
		}

		if (jobSeekerPost.getDescription() != null) {
			existed.setDescription(jobSeekerPost.getDescription());
		}

		if (jobSeekerPost.getTags() != null) {
			existed.setTags(jobSeekerPost.getTags());
		}

		if (jobSeekerPost.getSkills() != null) {
			existed.setSkills(jobSeekerPost.getSkills());
		}

		if (jobSeekerPost.getKeywords() != null) {
			existed.setKeywords(jobSeekerPost.getKeywords());
		}

		return seekerPostRepo.saveAndFlush(existed);
	}

	public JobSeekerPost getJobSeekerPostById(long id) {
		return seekerPostRepo.findJobSeekerPostById(id).orElseThrow(
				() -> new JobPostNotFoundException("Job post with id " + id + " was not found"));
	}
}
