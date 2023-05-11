package com.apple.JobBoard.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apple.JobBoard.model.Admin;

public interface AdminRepo extends JpaRepository<Admin, Long> {
	Admin findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	Optional<Admin> findByEmail(String email);
}
