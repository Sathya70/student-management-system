package com.example.student.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "marks")
public class Marks {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private Integer maths;
	private Integer science;
	private Integer social;
	private Integer tamil;
	private Integer english;

	// Calculated fields (not stored in DB)
	@Transient
	private Integer total;

	@Transient
	private Double average;

	@Transient
	private String grade;
	@Column(nullable = false)
	private String regNo;

	public String getRegNo() {
		return regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	// Getters and Setters
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getMaths() {
		return maths;
	}

	public void setMaths(Integer maths) {
		this.maths = maths;
	}

	public Integer getScience() {
		return science;
	}

	public void setScience(Integer science) {
		this.science = science;
	}

	public Integer getSocial() {
		return social;
	}

	public void setSocial(Integer social) {
		this.social = social;
	}

	public Integer getTamil() {
		return tamil;
	}

	public void setTamil(Integer tamil) {
		this.tamil = tamil;
	}

	public Integer getEnglish() {
		return english;
	}

	public void setEnglish(Integer english) {
		this.english = english;
	}

	public Integer getTotal() {
		if (maths != null && science != null && social != null && tamil != null && english != null) {
			total = maths + science + social + tamil + english;
		}
		return total;
	}

	public Double getAverage() {
		if (getTotal() != null) {
			average = getTotal() / 5.0;
		}
		return average;
	}

	public String getGrade() {
		if (getAverage() != null) {
			if (average >= 90)
				grade = "A+";
			else if (average >= 80)
				grade = "A";
			else if (average >= 70)
				grade = "B+";
			else if (average >= 60)
				grade = "B";
			else if (average >= 50)
				grade = "C";
			else
				grade = "D";
		}
		return grade;
	}
}
