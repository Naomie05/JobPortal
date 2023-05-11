package com.apple.JobBoard.model;



import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import org.hibernate.annotations.CreationTimestamp;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Entity
// @RedisHash("job_post")
public class JobPost implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@ManyToOne(cascade = {
			CascadeType.PERSIST,
			CascadeType.MERGE,
			CascadeType.REFRESH
	}, targetEntity = JobRecruiter.class)
	@JoinColumn(name = "recruiter_id")
	private JobRecruiter recruiter;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "salary")
	private double salary;

	@Column(name = "responsabilites")
	private String responsabilites;

	@Column(name = "expectations")
	private String expectations;

	@Column(name = "location")
	private String location;

	@Column(name = "role")
	private String role;

	@Column(name = "status")
	private String status;

	@CreationTimestamp
	@Column(name = "created_at")
	private Date createdTime;

	@ElementCollection(targetClass = String.class)
	@CollectionTable(name = "job_post_keywords")
	@Column(name = "keywords")
	private List<String> keywords = List.of();

	public JobPost() {
	}

	public JobPost(JobRecruiter recruiter, String title, String description, Double salary, String responsabilites,
			String expectations, String location, String role, String status, List<String> keywords, Date created) {
		this.recruiter = recruiter;
		this.title = title;
		this.description = description;
		this.salary = salary;
		this.responsabilites = responsabilites;
		this.expectations = expectations;
		this.location = location;
		this.role = role;
		this.status = status;
		this.keywords = keywords;
		this.createdTime = created;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public JobRecruiter getRecruiter() {

		return recruiter;
	}

	public void setRecruiter(JobRecruiter recruiter) {

		this.recruiter = recruiter;
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

	public double getSalary() {
		return salary;
	}

	public void setSalary(double salary) {
		this.salary = salary;
	}

	public String getResponsabilites() {
		return responsabilites;
	}

	public void setResponsabilites(String responsabilites) {
		this.responsabilites = responsabilites;
	}

	public String getExpectations() {
		return expectations;
	}

	public void setExpectations(String expectations) {
		this.expectations = expectations;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<String> getKeywords() {
		return keywords;
	}

	public void setKeywords(List<String> keywords) {
		this.keywords = keywords;
	}

	public void setCreatedAt(Date timestamp) {
		this.createdTime = timestamp;
	}

	public Date getCreatedAt(){
		return createdTime;
	}

	@Override
	public String toString() {
		return "JobPost{" +
				"Id=" + this.id + '\'' +
				", Recruiter='" + this.recruiter +
				", Title='" + this.title + '\'' +
				", Description='" + this.description + '\'' +
				", Salary='" + this.salary + '\'' +
				", Responsabilites=" + this.responsabilites + '\'' +
				", Expectation='" + this.expectations + '\'' +
				", Location='" + this.location + '\'' +
				", Role='" + this.role + '\'' +
				", Status='" + this.status + '\'' +
				", Created at='" + this.createdTime + '\'' +
				", Keywords='" + this.keywords +
				'}';
	}
}