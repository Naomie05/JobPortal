package com.apple.JobBoard.service;

import java.util.List;
import java.util.Optional;
import java.util.function.BiConsumer;
import java.util.function.Consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.apple.JobBoard.exception.UserNotFoundException;
import com.apple.JobBoard.model.JobApplication;
import com.apple.JobBoard.model.JobPost;
import com.apple.JobBoard.model.JobSeeker;
import com.apple.JobBoard.model.Role;
import com.apple.JobBoard.model.request.LoginRequest;
import com.apple.JobBoard.model.request.MessageResponse;
import com.apple.JobBoard.model.request.SignupRequest;
import com.apple.JobBoard.model.request.UserInfoResponse;
import com.apple.JobBoard.repository.JobSeekerRepo;

@Service
public class JobSeekerService {
	@Autowired
	private JobSeekerRepo userRepo;
	@Autowired
	private JobPostService postService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;
	@Autowired
	AuthenticationManager authenticationManager;

	// List all Job Seekers
	// @Cacheable(value = "seekers")
	public List<JobSeeker> getAllusers() {
		return userRepo.findAll();
	}

	public boolean existsByUsername(String u) {
		return userRepo.existsByUsername(u);
	}

	public JobSeeker createUser(JobSeeker u) {
		return userRepo.save(u);
	}

	// @Cacheable(value = "seeker", key = "#id")
	public JobSeeker getById(long id) {
		return userRepo.findById(id).orElseThrow(
				() -> new UserNotFoundException("User by id " + id + " was not found"));
	}

	public boolean isExistedById(long id) {
		return userRepo.findById(id).orElse(null) != null;
	}

	public JobSeeker updateJobSeeker(JobSeeker jobSeeker) {
		return userRepo.save(jobSeeker);
	}

	// @CacheEvict(value = "seeker", key = "#id")
	public void deleteJobSeeker(long id) {
		userRepo.deleteById(id);
	}

	public boolean saveJobPost(long JobId, long userId) {
		JobPost jobPost = postService.getJobPostById(JobId);
		JobSeeker jobSeeker = getById(userId);
		if (jobPost == null || jobSeeker == null) {
			return false;
		}
		List<JobPost> interestedJobs = jobSeeker.getInteresteJobPosts();
		// Check if the jobPost already exists in the interestedJobs list
		if (interestedJobs.stream().anyMatch(j -> j.getId() == (jobPost.getId()))) {
			return false;
		}
		interestedJobs.add(jobPost);
		jobSeeker.setInteresteJobPosts(interestedJobs);
		userRepo.save(jobSeeker);
		return true;
	}

	public boolean deleteSavedJobPost(long JobId, long userId) {
		JobPost jobPost = postService.getJobPostById(JobId);
		JobSeeker jobSeeker = getById(userId);
		if (jobPost == null || jobSeeker == null) {
			return false;
		}
		List<JobPost> interestedJobs = jobSeeker.getInteresteJobPosts();
		// interestedJobs.remove(jobPost);
		if (interestedJobs.removeIf(jp -> jp.getId() == (JobId))) {
			jobSeeker.setInteresteJobPosts(interestedJobs);
			userRepo.save(jobSeeker);
			return true;
		}
		return false;
	}

	// @Cacheable(value = "saved_job_posts")
	public List<JobPost> getInteresteJobPosts(long userId) {
		JobSeeker jobSeeker = getById(userId);
		if (jobSeeker == null) {
			return null;
		}
		return jobSeeker.getInteresteJobPosts();
	}

	// @Cacheable(value = "applied_job_applications", key = "#userId")
	public List<JobApplication> getAppliedJobApplications(long userId) {
		JobSeeker jobSeeker = getById(userId);
		if (jobSeeker == null) {
			return null;
		}
		return jobSeeker.getJobApplications();
	}

	public JobSeeker createProfile(long id, JobSeeker userJson) {
		JobSeeker existed = userRepo.findById(id).orElseThrow(
				() -> new UserNotFoundException("User with id " + id + " was not found")
		);
		// update the record of the existed user with the values in json object
		// if the json value is null, don't take it
		if (userJson.getSkills() != null) {
			existed.setSkills(userJson.getSkills());
		}
		if (userJson.getYearsOfExperience() != 0) {
			existed.setYearsOfExperience(userJson.getYearsOfExperience());
		}
		if (userJson.getCertifications() != null) {
			existed.setCertifications(userJson.getCertifications());
		}
		if (userJson.getExperienceLevel() != null) {
			existed.setExperienceLevel(userJson.getExperienceLevel());
		}
		if (userJson.getTags() != null) {
			existed.setTags(userJson.getTags());
		}
		if (userJson.getEducation() != null) {
			existed.setEducation(userJson.getEducation());
		}
		// save the updated record and flush the database
		return userRepo.saveAndFlush(existed);
	}

	public JobSeeker updateProfile(long id, JobSeeker userJson) {

		JobSeeker existed = userRepo.findById(id).orElseThrow(
				() -> new UserNotFoundException("User with id " + id + " was not found")
		);
		if (userJson.getFirstName() != null) {
			existed.setFirstName(userJson.getFirstName());
		}
		if (userJson.getLastName() != null) {
			existed.setLastName(userJson.getLastName());
		}
		if (userJson.getAge() != null) {
			existed.setAge(userJson.getAge());
		}
		if (userJson.getEmail() != null) {
			existed.setEmail(userJson.getEmail());
		}
		if (userJson.getGender() != null) {
			existed.setGender(userJson.getGender());
		}
		if (userJson.getSkills() != null) {
			existed.setSkills(userJson.getSkills());
		}
		if (userJson.getYearsOfExperience() != 0) {
			existed.setYearsOfExperience(userJson.getYearsOfExperience());
		}
		if (userJson.getCertifications() != null) {
			existed.setCertifications(userJson.getCertifications());
		}
		if (userJson.getExperienceLevel() != null) {
			existed.setExperienceLevel(userJson.getExperienceLevel());
		}
		if (userJson.getTags() != null) {
			existed.setTags(userJson.getTags());
		}
		if (userJson.getEducation() != null) {
			existed.setEducation(userJson.getEducation());
		}
		if (userJson.getAddress().getCountry() != null) {
			existed.getAddress().setCountry(userJson.getAddress().getCountry());
		}
		if (userJson.getAddress().getCity() != null) {
			existed.getAddress().setCity(userJson.getAddress().getCity());
		}
		if (userJson.getAddress().getState() != null) {
			existed.getAddress().setState(userJson.getAddress().getState());
		}
		if (userJson.getAddress().getStreet() != null) {
			existed.getAddress().setStreet(userJson.getAddress().getStreet());
		}
		if (userJson.getAddress().getPostalCode() != null) {
			existed.getAddress().setPostalCode(userJson.getAddress().getPostalCode());
		}
		// save the updated record and flush the database
		return userRepo.saveAndFlush(existed);
	}

	public ResponseEntity<?> register(SignupRequest request) {
		if (request.getUsername() == null || request.getPassword() == null) {
			return new ResponseEntity<>("Error: Missing username or password!", HttpStatus.BAD_REQUEST);
		}
		if (request.getEmail() == null || request.getAddress() == null) {
			return new ResponseEntity<>("Error: Missing email or address!", HttpStatus.BAD_REQUEST);
		}
		if (userRepo.existsByUsername(request.getUsername())) {
			return new ResponseEntity<>("Error: Username is already taken!", HttpStatus.BAD_REQUEST);
		}
		if (userRepo.existsByEmail(request.getEmail())) {
			return new ResponseEntity<>("Error: Email is already taken!", HttpStatus.BAD_REQUEST);
		}
		// register user
		JobSeeker user = new JobSeeker(
				0, request.getFirstName(),
				request.getLastName(),
				request.getEmail(),
				passwordEncoder.encode(request.getPassword()),
				request.getUsername(),
				request.getGender(),
				request.getAge(),
				request.getAddress(),
				Role.USER_ROLE);
		userRepo.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	public ResponseEntity<?> login(LoginRequest request) {
		JobSeeker user = userRepo.findByUsername(request.getUsername());
		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error"));
		}
		String token = jwtService.generateToken(user);
		return ResponseEntity.ok().header(HttpHeaders.ACCEPT)
				.body(new UserInfoResponse(
						user.getId(),
						user.getUsername(),
						user.getEmail(),
						user.getPassword(),
						user.getRole().toString(), token));
	}
}