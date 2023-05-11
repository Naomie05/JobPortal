package com.apple.JobBoard.model.request;

public class UserInfoResponse {
	private long id;
	private String username;
	private String email;
	private String token;
	private String password;
	private String role;

	public UserInfoResponse(long id, String username, String email, String password, String role, String token) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.token = token;
		this.password = password;
		this.role = role;

	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String setToken(String token) {
		return this.token = token;
	}

	public String getToken() {
		return this.token;
	}

	public String setRole(String role) {
		return this.role = role;
	}

	public String getRole() {
		return this.role;
	}

	public String setPassword(String password) {
		return this.password = password;
	}

	public String getPassword() {
		return this.password;
	}
}
