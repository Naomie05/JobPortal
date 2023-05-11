package com.apple.JobBoard.service;

import java.util.List;

import com.apple.JobBoard.model.Admin;
import com.apple.JobBoard.model.JobApplication;
import com.apple.JobBoard.model.JobPost;
import com.apple.JobBoard.model.JobRecruiter;
import com.apple.JobBoard.model.JobSeeker;
import com.apple.JobBoard.model.JobSeekerPost;
import com.apple.JobBoard.model.Role;
import com.apple.JobBoard.model.request.LoginRequest;
import com.apple.JobBoard.model.request.MessageResponse;
import com.apple.JobBoard.model.request.SignupRequest;
import com.apple.JobBoard.model.request.UserInfoResponse;
import com.apple.JobBoard.repository.AdminRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {

	@Autowired
	private AdminRepo repo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JobPostService postService;
	@Autowired
	private JobSeekerService seekerService;
	@Autowired
	private JobSeekerPostService seekerPostService;
	@Autowired
	private JobApplicationService applicationService;
	@Autowired
	private JobRecruiterService recruiterService;
	@Autowired
	private JwtService jwtService;

	public boolean existsByUsername(String u) {
		return repo.existsByUsername(u);
	}

	public ResponseEntity<?> register(SignupRequest request) {
		if (request.getUsername() == null || request.getPassword() == null) {
			return new ResponseEntity<>("Error: Missing username or password!", HttpStatus.BAD_REQUEST);
		}
		if (request.getEmail() == null || request.getAddress() == null) {
			return new ResponseEntity<>("Error: Missing email or address!", HttpStatus.BAD_REQUEST);
		}
		// register user
		Admin user = new Admin(
				0,
				request.getFirstName(),
				request.getLastName(),
				request.getEmail(),
				passwordEncoder.encode(request.getPassword()),
				request.getUsername(),
				request.getGender(),
				request.getAge(),
				request.getAddress(),
				Role.ADMIN_ROLE);
		repo.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	public ResponseEntity<?> login(LoginRequest request) {
		Admin user = repo.findByUsername(request.getUsername());
		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			return new ResponseEntity<>("Error: Bad credentials!", HttpStatus.BAD_REQUEST);
		}
		String token = jwtService.generateToken(user);
		return ResponseEntity.ok().header(HttpHeaders.ACCEPT)
				.body(new UserInfoResponse(user.getId(),
						user.getUsername(),
						user.getEmail(),
						user.getPassword(),
						user.getRole().toString(), token));
	}

	public List<JobSeeker> getAllJobSeekers() {
		return seekerService.getAllusers();
	}

	public boolean deleteJobSeekerById(long id) {
		if (seekerService.isExistedById(id)) {
			seekerService.deleteJobSeeker(id);
			return true;
		}
		return false;
	}

	public List<JobRecruiter> getAllRrcruiters() {
		return recruiterService.getAllusers();
	}

	@Transactional
	public boolean deleteRecruiterById(long id) {
		if (!recruiterService.isExistedById(id)) {
			return false;
		}
		if (!postService.findJobPostByRecruiterID(id).isEmpty()) {
			postService.findJobPostByRecruiterID(id).forEach(post -> {
				// TODO: handle the return value of deleteJobPostById()
				deleteJobPostById(post.getId());
			});
		}
		recruiterService.deleteRecruiter(id);
		return true;
	}

	public List<JobPost> getAllJobPosts() {
		return postService.getJobPosts();
	}

	/**
	 * Deletes a JobPost by its ID and removes JobApplication objects that contain
	 * the
	 * given JobPost object. Also removes all associated objects from all
	 * JobSeekers.
	 *
	 * @param id The ID of the JobPost to be deleted.
	 * @return true if the JobPost is successfully deleted, false otherwise.
	 */
	@Transactional
	public boolean deleteJobPostById(long id) {
		JobApplication obj = applicationService.getJobApplications().stream()
				.filter(o -> o.getPost().getId() == id)
				.findAny().orElse(null);
		if (obj == null) {
			return false;
		}
		List<JobSeeker> users = seekerService.getAllusers();
		users.forEach(s -> {
			s.getJobApplications().removeIf(o -> o.getId() == obj.getId());
			s.getInteresteJobPosts().removeIf(o -> o.getId() == obj.getPost().getId());
		});
		applicationService.deleteJobApplicationById(obj.getId());
		postService.deleteJobPost(obj.getPost().getId());
		return true;
	}

	public List<JobSeekerPost> getAllJobSeekerPosts() {
		return seekerPostService.getJobSeekerPost();
	}

	public boolean deleteJobSeekerPostById(long id) {
		if (seekerPostService.isExistedById(id)) {
			seekerPostService.deleteJobSeekerPost(id);
			return true;
		}
		return false;
	}

	public List<JobApplication> getAllJobApplications() {
		return applicationService.getJobApplications();
	}

	@Transactional
	public boolean deleteJobApplicationById(long id) {
		JobApplication obj = applicationService.getJobApplications().stream()
				.filter(o -> o.getId() == id)
				.findAny().orElse(null);
		if (obj == null) {
			return false;
		}
		List<JobSeeker> users = seekerService.getAllusers();
		users.forEach(s -> {
			s.getJobApplications().removeIf(o -> o.getId() == obj.getId());
		});
		applicationService.deleteJobApplicationById(obj.getId());
		return true;
	}
}
