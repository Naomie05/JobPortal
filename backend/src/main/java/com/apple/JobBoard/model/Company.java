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
public class Company implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "name")
	private String Name;

	@Column(name = "website")
	private String Website;

	@Column(name = "number_of_employee")
	private String NumberOfEmployee;

	@Column(name = "description")
	private String Description;

	@ManyToOne(cascade = CascadeType.ALL, targetEntity = Address.class)
	@JoinColumn(name = "address_id")
	private Address address;

	public Company() {
	}

	public Company(long id, String name, String website, String numberOfEmployee, String description, Address address) {
		this.id = id;
		this.Name = name;
		this.Website = website;
		this.NumberOfEmployee = numberOfEmployee;
		this.Description = description;
		this.address = address;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return this.Name;
	}

	public void setName(String name) {
		this.Name = name;
	}

	public String getWebsite() {
		return this.Website;
	}

	public void setWebsite(String website) {
		this.Website = website;
	}

	public String getNumberOfEmployee() {
		return this.NumberOfEmployee;
	}

	public void setNumberOfEmployee(String numberOfEmployee) {
		this.NumberOfEmployee = numberOfEmployee;
	}

	public String getDescription() {
		return this.Description;
	}

	public void setDescription(String description) {
		this.Description = description;
	}

	public Address getAddress() {
		return this.address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Company{" +
				"id=" + this.id +
				", Name='" + this.Name + '\'' +
				", Website='" + this.Website + '\'' +
				", NumberOfEmployee='" + this.NumberOfEmployee + '\'' +
				", Description='" + this.Description + '\'' +
				", address=" + this.address +
				'}';
	}
}
