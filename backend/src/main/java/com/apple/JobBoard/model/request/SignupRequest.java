package com.apple.JobBoard.model.request;

import com.apple.JobBoard.model.Address;
import com.apple.JobBoard.model.Role;

public class SignupRequest {

	private String firstname;
	private String lastname;
	private String email;
	private String password;
	private String username;
	private String gender;
	private String age;
	private Address address;
	protected Role role;

	public SignupRequest(String firstName, String lastName, String email, String password, String username,
			String gender, String age, Address address, Role role) {

		this.firstname = firstName;
		this.lastname = lastName;
		this.email = email;
		this.password = password;
		this.username = username;
		this.gender = gender;
		this.age = age;
		this.address = address;
		this.role = role;
	}

	public SignupRequest() {
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return this.firstname;
	}

	public void setFirstName(String firstName) {
		this.firstname = firstName;
	}

	public String getLastName() {
		return this.lastname;
	}

	public void setLastName(String lastName) {
		this.lastname = lastName;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGender() {
		return this.gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAge() {
		return this.age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public Address getAddress() {
		return this.address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Role setRole(Role roleUser) {
		return this.role = roleUser;
	}

	public Role getRole() {
		return this.role;
	}

	@Override
	public String toString() {
		return "User{" +
				", FirstName='" + this.firstname + '\'' +
				", LastName='" + this.lastname + '\'' +
				", Email='" + this.email + '\'' +
				", Password='" + this.password + '\'' +
				", username='" + this.username + '\'' +
				", Gender='" + this.gender + '\'' +
				", Age='" + this.age + '\'' +
				", address=" + this.address +
				", role='" + this.role + '\'' +
				'}';
	}
}
