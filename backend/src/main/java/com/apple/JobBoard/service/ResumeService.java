package com.apple.JobBoard.service;

import com.apple.JobBoard.model.JobApplication;
import com.apple.JobBoard.model.JobPost;
import com.apple.JobBoard.model.JobSeeker;
import com.apple.JobBoard.model.Resume;
import com.apple.JobBoard.repository.JobSeekerRepo;
import com.apple.JobBoard.repository.ResumeRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepo resumeRepo;

    @Autowired
    private JobSeekerRepo seekerRepo;

    public void deleteById(long id) {
        resumeRepo.deleteById(id);
    }

    public Resume store(MultipartFile file, Long id) throws IOException {
        JobSeeker jobSeeker = seekerRepo.findById(id).orElse(null);
        if (jobSeeker == null){
            return null;
        }
        Optional<Resume> existingResume = getAllFiles().stream()
                .filter(o -> o.getSeeker().getId() == id)
                .findAny();
        if (existingResume.isPresent()) {
            throw new IllegalArgumentException("Job seeker already has a resume");
        }
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Resume Resume = new Resume(fileName, file.getContentType(), file.getBytes(), jobSeeker);
        return resumeRepo.save(Resume);
    }

    public Resume getFile(Long id){
        return resumeRepo.findById(id).get();
    }

    public Resume findResumeBySeekerID(long id) {
       return getAllFiles().stream()
                .filter(o -> o.getSeeker().getId() == id)
                .findAny().orElse(null);
    }

    public List<Resume> getAllFiles(){
        return resumeRepo.findAll();
    }
}
