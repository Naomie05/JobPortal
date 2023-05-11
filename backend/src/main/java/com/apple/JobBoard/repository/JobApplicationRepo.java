package com.apple.JobBoard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.apple.JobBoard.model.JobApplication;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface JobApplicationRepo extends JpaRepository<JobApplication, Long> {

	//boolean deleteById(long id);
	@Modifying
	@Query("DELETE FROM JobApplication ja WHERE ja.post.id = :id")
	void deleteByJobPostId(@Param("id") long id);
}
