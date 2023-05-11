package com.apple.JobBoard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.apple.JobBoard.model.Address;
import com.apple.JobBoard.model.Role;
import com.apple.JobBoard.model.request.SignupRequest;
import com.apple.JobBoard.repository.JobRecruiterRepo;
import com.apple.JobBoard.service.JobRecruiterService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(value = JobRecruiterController.class)
@ContextConfiguration(classes = JobRecruiterController.class)
@WithMockUser
public class TestJobRecruiterController {
	@MockBean
	private JobRecruiterService service;
	@Mock
	private JobRecruiterRepo userRepo;
	@Autowired
	private MockMvc mock;
	@Autowired
	private ObjectMapper objectMapper;

	@Test
	public void registerJobRecruiter() throws Exception {
		Address address = new Address("US", "PA", "Pittsburgh", "1555", "3001 Mcknight");
		SignupRequest obj = new SignupRequest("Yazeed", "Naif", "yaz@gmail.com", "1122", "yaz14", "M", "22", address,
				Role.USER_ROLE);
		System.out.println(objectMapper.writeValueAsString(obj));
		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String json = ow.writeValueAsString(obj);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/v1/auth/users/recruiter/signup").with(csrf().asHeader())
				.accept(MediaType.APPLICATION_JSON)
				.content(json)
				.contentType(MediaType.APPLICATION_JSON);
		MvcResult result = mock.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();
		assertEquals(HttpStatus.OK.value(), response.getStatus());
	}

	@Test
	public void failedSignupBecauseEmailIsMessing() throws Exception {
		Address address = new Address("US", "PA", "Pittsburgh", "1555", "3001 Mcknight");
		SignupRequest obj = new SignupRequest("Yazeed", "Naif", null, "1122", "yaz14", "M", "22", address,
				Role.USER_ROLE);
		System.out.println(objectMapper.writeValueAsString(obj));
		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String json = ow.writeValueAsString(obj);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/v1/auth/users/recruiter/signup").with(csrf().asHeader())
				.accept(MediaType.APPLICATION_JSON)
				.content(json)
				.contentType(MediaType.APPLICATION_JSON);
		MvcResult result = mock.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();
		assertNotEquals(HttpStatus.OK, response.getStatus());
	}

	@Test
	public void shouldFailBecausePasswordIsMessing() throws Exception {
		Address address = new Address("US", "PA", "Pittsburgh", "1555", "3001 Mcknight");
		SignupRequest obj = new SignupRequest("Yazeed", "Naif", "yaz@gmail.com", null, "yaz14", "M", "22", address,
				Role.USER_ROLE);
		obj.setPassword(null);
		System.out.println(objectMapper.writeValueAsString(obj));
		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String json = ow.writeValueAsString(obj);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/v1/auth/users/recruiter/signup").with(csrf().asHeader())
				.accept(MediaType.APPLICATION_JSON)
				.content(json)
				.contentType(MediaType.APPLICATION_JSON);
		MvcResult result = mock.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();
		assertNotEquals(HttpStatus.OK, response.getStatus());
	}

	@Test
	public void shouldFailBecauseAddressIsMessing() throws Exception {
		Address address = null;
		SignupRequest obj = new SignupRequest("Yazeed", "Naif",
				"yaz@gmail.com", "1122", "yaz14", "M", "22", address,
				Role.USER_ROLE);
		System.out.println(objectMapper.writeValueAsString(obj));
		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String json = ow.writeValueAsString(obj);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/v1/auth/users/recruiter/signup").with(csrf().asHeader())
				.accept(MediaType.APPLICATION_JSON)
				.content(json)
				.contentType(MediaType.APPLICATION_JSON);
		MvcResult result = mock.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();
		assertNotEquals(HttpStatus.OK, response.getStatus());
	}
}