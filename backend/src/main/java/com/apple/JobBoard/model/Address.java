package com.apple.JobBoard.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Address implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "country")
	private String Country;

	@Column(name = "state")
	private String State;

	@Column(name = "city")
	private String City;

	@Column(name = "postal_code")
	private String PostalCode;

	@Column(name = "street")
	private String Street;

	public Address(String country, String state, String city, String postalCode, String street) {
		Country = country;
		State = state;
		City = city;
		PostalCode = postalCode;
		Street = street;
	}

	public Address() {
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public String getCountry() {
		return Country;
	}

	public void setCountry(String country) {
		Country = country;
	}

	public String getState() {
		return State;
	}

	public void setState(String state) {
		State = state;
	}

	public String getCity() {
		return City;
	}

	public void setCity(String city) {
		City = city;
	}

	public String getPostalCode() {
		return PostalCode;
	}

	public void setPostalCode(String postalCode) {
		PostalCode = postalCode;
	}

	public String getStreet() {
		return Street;
	}

	public void setStreet(String street) {
		Street = street;
	}

	@Override
	public String toString() {
		return "Address{" +
				"Country='" + Country + '\'' +
				", State='" + State + '\'' +
				", City='" + City + '\'' +
				", PostalCode='" + PostalCode + '\'' +
				", Street='" + Street + '\'' +
				'}';
	}

}
