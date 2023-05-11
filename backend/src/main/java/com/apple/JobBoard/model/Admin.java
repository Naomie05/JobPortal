package com.apple.JobBoard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin extends User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	public Admin(long id, String firstName, String lastName, String email, String password, String username,
			String gender, String age, Address address, Role role) {
		super(id, firstName, lastName, email, password, username, gender, age, address, role);
	}

	public Admin() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Admin{" +
				"id=" + this.id +
				'}';
	}

}
