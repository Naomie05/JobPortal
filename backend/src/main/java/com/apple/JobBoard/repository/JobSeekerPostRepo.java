package com.apple.JobBoard.repository;

import com.apple.JobBoard.model.JobSeekerPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobSeekerPostRepo extends JpaRepository<JobSeekerPost, Long> {

	Optional<JobSeekerPost> findJobSeekerPostById(long id);
	
	// boolean deleteById(long id);
}
