package com.apple.JobBoard.repository;

import com.apple.JobBoard.model.JobRecruiter;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRecruiterRepo extends JpaRepository<JobRecruiter, Long> {
	JobRecruiter findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	Optional<JobRecruiter> findByEmail(String email);
	
	// boolean deleteById(long id);
}
