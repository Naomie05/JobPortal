package com.apple.JobBoard.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
// @Table(name = "candidate")
public class JobSeeker extends User {

	@Column(name = "skills")
	private String Skills;

	@Column(name = "years_of_experience")
	private int YearsOfExperience;

	@Column(name = "certifications")
	private String Certifications;

	@Column(name = "education")
	private String Education;

	@Column(name = "experience_level")
	private String ExperienceLevel;

	@ElementCollection(fetch = FetchType.EAGER, targetClass = String.class)
	@CollectionTable(name = "job_seeker_tags")
	@Column(name = "tags")
	private List<String> Tags = List.of();

	@ManyToMany(cascade = {
			CascadeType.PERSIST,
			CascadeType.MERGE,
			CascadeType.REFRESH
	})
	@JoinTable(name = "interested_jobs", joinColumns = {
			@JoinColumn(name = "seeker_id", referencedColumnName = "id")
	}, inverseJoinColumns = {
			@JoinColumn(name = "job_id", referencedColumnName = "id")
	})
	private List<JobPost> savedJobs = List.of();

	@OneToMany(targetEntity = JobApplication.class, cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<JobApplication> JobApplications = List.of();

	public JobSeeker() {
	}

	public JobSeeker(long id, String firstName, String lastName, String email, String password, String username,
			String gender, String age, String skills, int yearsOfExperience, String certifications, String education,
			String experienceLevel, List<String> tags, Address address, Role role, List<JobPost> interestedJobs,
			List<JobApplication> jobApplications) {
		super(id, firstName, lastName, email, password, username, gender, age, address, role);
		this.Skills = skills;
		this.YearsOfExperience = yearsOfExperience;
		this.Certifications = certifications;
		this.Education = education;
		this.ExperienceLevel = experienceLevel;
		this.Tags = tags;
		this.savedJobs = interestedJobs;
		this.JobApplications = jobApplications;

	}

	public JobSeeker(long id, String firstName, String lastName, String email, String password, String username,
			String gender, String age, Address address, Role role) {
		super(id, firstName, lastName, email, password, username, gender, age, address, role);
	}

	public String getSkills() {
		return this.Skills;
	}

	public void setSkills(String skills) {
		this.Skills = skills;
	}

	public int getYearsOfExperience() {
		return this.YearsOfExperience;
	}

	public void setYearsOfExperience(int yearsOfExperience) {
		this.YearsOfExperience = yearsOfExperience;
	}

	public String getCertifications() {
		return this.Certifications;
	}

	public void setCertifications(String certifications) {
		this.Certifications = certifications;
	}

	public String getEducation() {
		return this.Education;
	}

	public void setEducation(String education) {
		this.Education = education;
	}

	public String getExperienceLevel() {
		return this.ExperienceLevel;
	}

	public void setExperienceLevel(String experienceLevel) {
		this.ExperienceLevel = experienceLevel;
	}

	public List<String> getTags() {
		return this.Tags;
	}

	public void setTags(List<String> tags) {
		this.Tags = tags;
	}

	@JsonIgnore
	public List<JobPost> getInteresteJobPosts() {
		return this.savedJobs;
	}

	public void setInteresteJobPosts(List<JobPost> posts) {
		this.savedJobs = posts;
	}

	@JsonIgnore
	public List<JobApplication> getJobApplications() {
		return this.JobApplications;
	}

	public void setJobApplications(List<JobApplication> jobs) {
		this.JobApplications = jobs;
	}

	@Override
	public String toString() {
		return "JobSeeker{" +
				"id=" + this.getId() + '\'' +
				"Skills='" + this.Skills + '\'' +
				", YearsOfExperience=" + this.YearsOfExperience +
				", Certifications='" + this.Certifications + '\'' +
				", Education='" + this.Education + '\'' +
				", ExperienceLevel='" + this.ExperienceLevel + '\'' +
				", Tags=" + this.Tags + '\'' +
				", savedJobs='" + this.savedJobs + '\'' +
				", JobApplication=" + this.JobApplications +
				'}';
	}
}