package com.apple.JobBoard.controller;

import com.apple.JobBoard.message.ResponseFile;
import com.apple.JobBoard.message.ResponseMessage;
import com.apple.JobBoard.model.JobPost;
import com.apple.JobBoard.model.JobSeeker;
import com.apple.JobBoard.model.Resume;
import com.apple.JobBoard.repository.JobSeekerRepo;
import com.apple.JobBoard.service.JobSeekerService;
import com.apple.JobBoard.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
//@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v2/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private JobSeekerService seekerService;

    @PostMapping("/upload/{id}")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file")MultipartFile file, @PathVariable("id")Long id){
        String message = "";
        try {
            resumeService.store(file, seekerService.getById(id).getId());
            message = "Uploaded the file successfully: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e){
            message = "Could not upload the file: " + file.getOriginalFilename()+ "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @GetMapping(value = "/user/{id}/get")
    public ResponseEntity<Resume> findResumeBySeekerID(@PathVariable("id") long id) {
        final Resume resumes = resumeService.findResumeBySeekerID(id);
        return resumes == null
                ? new ResponseEntity<>(HttpStatus.BAD_REQUEST)
                : new ResponseEntity<>(resumes, HttpStatus.OK);
    }
}
