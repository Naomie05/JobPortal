package com.apple.JobBoard.model;

import java.io.Serializable;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
// @RedisHash("job_application")
public class JobApplication implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@ManyToOne(cascade = {
			CascadeType.PERSIST,
			CascadeType.MERGE,
			CascadeType.REFRESH
	})
	@JoinColumn(name = "job_id")
	private JobPost post;

	@ManyToOne(cascade = {
			CascadeType.PERSIST,
			CascadeType.MERGE,
			CascadeType.REFRESH
	})
	@JoinColumn(name = "jobSeeker_id")
	private JobSeeker user;

	@Column(name = "status")
	private String status;

	// TODO: PDF

	@Column(name = "interviewLocation")
	private String interviewLocation;

	@Column(name = "interviewAccepted")
	private boolean interviewAccepted;

	public JobApplication(long id, JobPost post, JobSeeker user, String status, String interviewLocation,
			boolean interviewAccepted) {
		this.id = id;
		this.post = post;
		this.user = user;
		this.status = status;
		this.interviewLocation = interviewLocation;
		this.interviewAccepted = interviewAccepted;
	}

	public JobApplication() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public JobPost getPost() {
		return this.post;
	}

	public void setPost(JobPost post) {
		this.post = post;
	}

	public JobSeeker getUser() {
		return user;
	}

	public void setUser(JobSeeker user) {
		this.user = user;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getInterviewLocation() {
		return interviewLocation;
	}

	public void setInterviewLocation(String interviewLocation) {
		this.interviewLocation = interviewLocation;
	}

	public boolean getInterviewAccepted() {
		return interviewAccepted;
	}

	public void setInterviewAccepted(boolean interviewAccepted) {
		this.interviewAccepted = interviewAccepted;
	}

	@Override
	public String toString() {
		return "JobApplication{" +
				"id=" + id +
				", post=" + post +
				", user=" + user +
				", status='" + status + '\'' +
				", interviewLocation='" + interviewLocation + '\'' +
				", interviewAccepted=" + interviewAccepted +
				'}';
	}
}
