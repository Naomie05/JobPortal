package com.apple.JobBoard.exception;

public class JobPostNotFoundException extends RuntimeException {
	public JobPostNotFoundException(String message) {
		super(message);
	}
}