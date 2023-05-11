package com.apple.JobBoard.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
// @RedisHash("recruiter")
public class JobRecruiter extends User {

	@ManyToOne(cascade = CascadeType.ALL, targetEntity = Company.class)
	@JoinColumn(name = "company_id")
	private Company company;

	@ManyToMany(cascade = {
			CascadeType.PERSIST,
			CascadeType.MERGE,
			CascadeType.REFRESH
	})
	@JoinTable(name = "saved_candidates", joinColumns = {
			@JoinColumn(name = "recruiter_id", referencedColumnName = "id")
	}, inverseJoinColumns = {
			@JoinColumn(name = "seeker_id", referencedColumnName = "id")
	})
	@JsonIgnore
	private List<JobSeekerPost> candidates;

	public JobRecruiter(long id, String firstName, String lastName, String email, String password, String username,
			String gender, String age, Address address, Role role, Company company, List<JobSeekerPost> candidates) {
		super(id, firstName, lastName, email, password, username, gender, age, address, role);
		this.company = company;
		this.candidates = candidates;
	}

	public JobRecruiter(Company company) {
		this.company = company;
	}

	public JobRecruiter(long id, String firstName, String lastName, String email, String password, String username,
			String gender, String age, Address address, Role role) {
		super(id, firstName, lastName, email, password, username, gender, age, address, role);
	}

	public JobRecruiter() {

	}

	public Company getCompany() {
		return this.company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public List<JobSeekerPost> getCandidates() {
		return this.candidates;
	}

	public void setCandidates(List<JobSeekerPost> posts) {
		this.candidates = posts;
	}

	@Override
	public String toString() {
		return "JobRecruiter{" +
				"company=" + this.company +
				"candidates=" + this.candidates +
				'}';
	}

}