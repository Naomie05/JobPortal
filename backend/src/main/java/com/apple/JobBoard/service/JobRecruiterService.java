package com.apple.JobBoard.service;

import com.apple.JobBoard.exception.UserNotFoundException;
import com.apple.JobBoard.model.JobRecruiter;
import com.apple.JobBoard.model.JobSeekerPost;
import com.apple.JobBoard.model.Role;
import com.apple.JobBoard.model.request.LoginRequest;
import com.apple.JobBoard.model.request.MessageResponse;
import com.apple.JobBoard.model.request.SignupRequest;
import com.apple.JobBoard.model.request.UserInfoResponse;
import com.apple.JobBoard.repository.JobRecruiterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobRecruiterService {
	@Autowired
	private JobRecruiterRepo userRepo;
	@Autowired
	private JobSeekerPostService postService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;
	@Autowired
	AuthenticationManager authenticationManager;

	public List<JobRecruiter> getAllusers() {
		return userRepo.findAll();
	}

	public void deleteRecruiter(long id) {
		userRepo.deleteById(id);
	}

	public boolean isExistedById(long id) {
		return userRepo.findById(id).orElse(null) != null;
	}

	public boolean existsByUsername(String u) {
		return userRepo.existsByUsername(u);
	}

	public JobRecruiter createUser(JobRecruiter u) {
		return userRepo.save(u);
	}

	// @Cacheable(value = "recruiter", key = "#id")
	public JobRecruiter getById(long id) {
		return userRepo.findById(id).orElseThrow(
				() -> new UserNotFoundException("User doesnt exist in system"));
	}

	public boolean saveCandidate(long postId, long userId) {
		JobSeekerPost post = postService.getJobSeekerPostById(postId);
		JobRecruiter recruiter = getById(userId);
		if (post == null || recruiter == null) {
			return false;
		}
		List<JobSeekerPost> candidates = recruiter.getCandidates();
		if (candidates.stream().anyMatch(j -> j.getId() == (post.getId()))) {
			return false;
		}
		candidates.add(post);
		recruiter.setCandidates(candidates);
		userRepo.save(recruiter);
		return true;
	}

	// @Cacheable(value = "saved_job_seeker_posts", key = "#id")
	public List<JobSeekerPost> getSavedCandidates(long userId) {
		JobRecruiter recruiter = getById(userId);
		if (recruiter == null) {
			return null;
		}
		return recruiter.getCandidates();
	}

	public JobRecruiter createProfile(long id, JobRecruiter userJson) {

		JobRecruiter existed = userRepo.findById(id).orElseThrow(
				() -> new UserNotFoundException("User with id " + id + " was not found")
		);
		// update the record of the existed user with the values in json object
		// if the json value is null, don't take it
		if (userJson.getCompany() != null) {
			existed.setCompany(userJson.getCompany());
		}
		if (userJson.getCompany().getAddress().getCountry() != null) {
			existed.getCompany().getAddress().setCountry(userJson.getCompany().getAddress().getCountry());
		}
		if (userJson.getCompany().getAddress().getState() != null) {
			existed.getCompany().getAddress().setState(userJson.getCompany().getAddress().getState());
		}
		if (userJson.getCompany().getAddress().getCity() != null) {
			existed.getCompany().getAddress().setCity(userJson.getCompany().getAddress().getCity());
		}
		if (userJson.getCompany().getAddress().getStreet() != null) {
			existed.getCompany().getAddress().setStreet(userJson.getCompany().getAddress().getStreet());
		}
		if (userJson.getCompany().getAddress().getPostalCode() != null) {
			existed.getCompany().getAddress().setPostalCode(userJson.getCompany().getAddress().getPostalCode());
		}
		if (userJson.getCompany().getName() != null) {
			existed.getCompany().setName(userJson.getCompany().getName());
		}
		if (userJson.getCompany().getWebsite() != null) {
			existed.getCompany().setWebsite(userJson.getCompany().getWebsite());
		}
		if (userJson.getCompany().getNumberOfEmployee() != null) {
			existed.getCompany().setNumberOfEmployee(userJson.getCompany().getNumberOfEmployee());
		}
		if (userJson.getCompany().getDescription() != null) {
			existed.getCompany().setDescription(userJson.getCompany().getDescription());
		}
		// save the updated record and flush the database
		return userRepo.saveAndFlush(existed);
	}

	public JobRecruiter updateProfile(long id, JobRecruiter userJson){

		JobRecruiter existed = userRepo.findById(id).orElseThrow(
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
		if (userJson.getCompany() != null) {
			existed.setCompany(userJson.getCompany());
		}
		if (userJson.getCompany().getAddress().getCountry() != null) {
			existed.getCompany().getAddress().setCountry(userJson.getCompany().getAddress().getCountry());
		}
		if (userJson.getCompany().getAddress().getState() != null) {
			existed.getCompany().getAddress().setState(userJson.getCompany().getAddress().getState());
		}
		if (userJson.getCompany().getAddress().getCity() != null) {
			existed.getCompany().getAddress().setCity(userJson.getCompany().getAddress().getCity());
		}
		if (userJson.getCompany().getAddress().getStreet() != null) {
			existed.getCompany().getAddress().setStreet(userJson.getCompany().getAddress().getStreet());
		}
		if (userJson.getCompany().getAddress().getPostalCode() != null) {
			existed.getCompany().getAddress().setPostalCode(userJson.getCompany().getAddress().getPostalCode());
		}
		if (userJson.getCompany().getName() != null) {
			existed.getCompany().setName(userJson.getCompany().getName());
		}
		if (userJson.getCompany().getWebsite() != null) {
			existed.getCompany().setWebsite(userJson.getCompany().getWebsite());
		}
		if (userJson.getCompany().getNumberOfEmployee() != null) {
			existed.getCompany().setNumberOfEmployee(userJson.getCompany().getNumberOfEmployee());
		}
		if (userJson.getCompany().getDescription() != null) {
			existed.getCompany().setDescription(userJson.getCompany().getDescription());
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

		JobRecruiter user = new JobRecruiter(
				0, request.getFirstName(),
				request.getLastName(),
				request.getEmail(),
				passwordEncoder.encode(request.getPassword()),
				request.getUsername(),
				request.getGender(),
				request.getAge(),
				request.getAddress(),
				Role.USER_ROLE);
		// String encodedPassword = passwordEncoder.encode(user.getPassword());
		// user.setPassword(encodedPassword);
		userRepo.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	public ResponseEntity<?> login(LoginRequest request) {
		JobRecruiter user = userRepo.findByUsername(request.getUsername());
		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error"));
		}
		String token = jwtService.generateToken(user);
		return ResponseEntity.ok().header(HttpHeaders.ACCEPT)
				.body(new UserInfoResponse(user.getId(),
						user.getUsername(),
						user.getEmail(), user.getPassword(), user.getRole().toString(), token));
	}

	// TODO: write a logout method that deactivate/devalidate the Jwt token that
	// is generated after login
	// (will be implmentated AFTER all some of the user Functionalities are done in
	// the app)
}
