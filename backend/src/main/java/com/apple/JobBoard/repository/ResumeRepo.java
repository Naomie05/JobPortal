package com.apple.JobBoard.repository;

import com.apple.JobBoard.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResumeRepo extends JpaRepository<Resume, Long> {

    Optional<Resume> findByName(String fileName);
}

