package com.apple.JobBoard.model;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class User implements UserDetails { // NOTE: UserDetails extends Serializable

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "first_name", nullable = false)
	private String firstname;

	@Column(name = "last_name", nullable = false)
	private String lastname;

	@Column(name = "email", unique = true, nullable = false)
	private String email;

	@Column(name = "password", unique = true, nullable = false)
	private String password;

	@Column(name = "username", unique = true, nullable = false)
	private String username;

	@Column(name = "gender", nullable = false)
	private String gender;

	@Column(name = "age", nullable = false)
	private String age;

	@ManyToOne(cascade = CascadeType.ALL, targetEntity = Address.class)
	@JoinColumn(name = "address_id", nullable = false)
	private Address address;

	@Enumerated(EnumType.STRING)
	protected Role role;

	public User(long id, String firstName, String lastName, String email, String password, String username,
			String gender, String age, Address address, Role role) {
		this.id = id;
		this.firstname = firstName;
		this.lastname = lastName;
		this.email = email;
		this.password = password;
		this.username = username;
		this.gender = gender;
		this.age = age;
		this.address = address;
		this.role = role;

	}

	public User() {

	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return this.firstname;
	}

	public void setFirstName(String firstName) {
		this.firstname = firstName;
	}

	public String getLastName() {
		return this.lastname;
	}

	public void setLastName(String lastName) {
		this.lastname = lastName;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGender() {
		return this.gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAge() {
		return this.age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public Address getAddress() {
		return this.address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Role getRole() {
		return this.role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "User{" +
				"id=" + this.id +
				", FirstName='" + this.firstname + '\'' +
				", LastName='" + this.lastname + '\'' +
				", Email='" + this.email + '\'' +
				", Password='" + this.password + '\'' +
				", Username='" + this.username + '\'' +
				", Gender='" + this.gender + '\'' +
				", Age='" + this.age + '\'' +
				", address=" + this.address +
				", role='" + this.role + '\'' +
				'}';
	}
}