package com.apple.JobBoard.service;

import com.apple.JobBoard.exception.JobPostNotFoundException;
import com.apple.JobBoard.exception.UserNotFoundException;
import com.apple.JobBoard.model.JobPost;
import com.apple.JobBoard.model.JobRecruiter;
import com.apple.JobBoard.repository.JobPostRepo;
import com.apple.JobBoard.repository.JobRecruiterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobPostService {

	@Autowired
	private JobPostRepo postRepo;

	@Autowired
	private JobRecruiterRepo recruiterRepo;

	// @Cacheable(value = "job_posts")
	public List<JobPost> getJobPosts() {
		return postRepo.findAll();
	}

	// @Cacheable(value = "job_post", key = "#id")
	public JobPost getJobPostById(long id) {
		return postRepo.findJobPostById(id).orElseThrow(
				() -> new JobPostNotFoundException("Job post with id " + id + " was not found")
		);
	}

	// @Cacheable(value = "job_post_by_recc", key = "#id")
	public List<JobPost> findJobPostByRecruiterID(long id) {
		List<JobPost> list = getJobPosts();
		return list.stream()
				.filter(post -> post.getRecruiter().getId() == id)
				.collect(Collectors.toList());
	}

	public JobPost addJobPost(JobPost jobPost) {
		return postRepo.save(jobPost);
	}

	public JobPost createJobPost(JobPost jobPost, long id) {
		JobRecruiter jobRecruiter = recruiterRepo.findById(id).orElseThrow(
				() -> new UserNotFoundException("Recruiter with id " + id + " was not found")
		);
		jobPost.setRecruiter(jobRecruiter);
		return postRepo.save(jobPost);
	}

	public void deleteJobPost(long id) {
		postRepo.deleteById(id);
	}

	// @CachePut(value = "job_post", key = "#id")
	public JobPost updateJobPostById(long id, JobPost jobPost) {
		if (postRepo.findById(id).isEmpty()) {
			return null;
		}
		JobPost existed = postRepo.findById(id).get();

		if (jobPost.getTitle() != null) {
			existed.setTitle(jobPost.getTitle());
		}

		if (jobPost.getDescription() != null) {
			existed.setDescription(jobPost.getDescription());
		}

		if (jobPost.getSalary() != 0) {
			existed.setSalary(jobPost.getSalary());
		}

		if (jobPost.getResponsabilites() != null) {
			existed.setResponsabilites(jobPost.getResponsabilites());
		}

		if (jobPost.getExpectations() != null) {
			existed.setExpectations(jobPost.getExpectations());
		}

		if (jobPost.getLocation() != null) {
			existed.setLocation(jobPost.getLocation());
		}

		if (jobPost.getRole() != null) {
			existed.setRole(jobPost.getRole());
		}

		if (jobPost.getStatus() != null) {
			existed.setStatus(jobPost.getStatus());
		}

		if (jobPost.getKeywords() != null) {
			existed.setKeywords(jobPost.getKeywords());
		}

		return postRepo.saveAndFlush(existed);
	}
}