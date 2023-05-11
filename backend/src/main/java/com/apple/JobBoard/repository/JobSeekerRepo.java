package com.apple.JobBoard.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.apple.JobBoard.model.JobSeeker;

import java.util.Optional;


public interface JobSeekerRepo extends JpaRepository<JobSeeker, Long> {
	JobSeeker findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	Optional<JobSeeker> findByEmail(String email);

	// boolean deleteById(long id);
}
