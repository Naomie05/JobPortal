package com.apple.JobBoard.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
// @RedisHash("seeker_post")
public class JobSeekerPost implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@ManyToOne(cascade = {
			CascadeType.PERSIST,
			CascadeType.MERGE,
			CascadeType.REFRESH
	}, targetEntity = JobSeeker.class)
	@JoinColumn(name = "seeker_id")
	private JobSeeker seeker;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	//	@ManyToOne(cascade = {
	//			CascadeType.PERSIST,
	//			CascadeType.MERGE,
	//			CascadeType.REFRESH
	//	}, targetEntity = Resume.class)
	//	@JoinColumn(name = "resume_id")
	//	private Resume resume;

	@Column(name = "skills")
	private String skills;

	@Column(name = "tags")
	@ElementCollection
	private List<String> tags = List.of();

	@Column(name = "keywords")
	@ElementCollection
	private List<String> keywords = List.of();

	public JobSeekerPost() {
	}

	public JobSeekerPost(JobSeeker seeker, String title, String description, List<String> tags, List<String> keywords,
			String skills) {
		this.seeker = seeker;
		this.title = title;
		this.description = description;
		this.tags = tags;
		this.keywords = keywords;
		this.skills = skills;
		//		this.resume = resume;
	}

	//	public Resume getResume() {
	//		return this.resume;
	//	}
	//
	//	public void setResume(Resume resume) {
	//		this.resume = resume;
	//	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public JobSeeker getSeeker() {
		return this.seeker;
	}

	public void setSeeker(JobSeeker seeker) {
		this.seeker = seeker;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public List<String> getKeywords() {
		return keywords;
	}

	public void setKeywords(List<String> keywords) {
		this.keywords = keywords;
	}

	public String getSkills() {
		return skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}

	@Override
	public String toString() {
		return "JobSeekerPost{" +
				"Id=" + this.id + '\'' +
				", Seeker='" + this.seeker +
				", Title='" + this.title + '\'' +
				", Description='" + this.description + '\'' +
				", Skills='" + this.skills + '\'' +
				", Tags='" + this.tags + '\'' +
				", Keywords='" + this.keywords +
				'}';
	}
}