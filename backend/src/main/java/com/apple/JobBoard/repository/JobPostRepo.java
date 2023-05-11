package com.apple.JobBoard.repository;

import com.apple.JobBoard.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobPostRepo extends JpaRepository<JobPost, Long> {

	Optional<JobPost> findJobPostById(long id);

	//boolean deleteById(long id);
	
	// @Query(value = "SELECT * FROM job_post WHERE recruiter_id = ?1", nativeQuery = true)
	// Optional<List<JobPost>> findJobPostByRecruiterID(Long id);
}