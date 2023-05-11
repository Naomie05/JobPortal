package com.apple.JobBoard.model.request;

public class LoginRequest {

	private String username;
	private String password;

	public LoginRequest(String username, String password) {
		this.password = password;
		this.username = username;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User{" +
				", Password='" + this.password + '\'' +
				", username='" + this.username + '\'' +
				'}';
	}
}
