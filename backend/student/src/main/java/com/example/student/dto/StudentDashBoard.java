package com.example.student.dto;

public class StudentDashBoard {

	private String regNo;
	private String name;

	private Integer tamil;
	private Integer english;
	private Integer maths;
	private Integer science;
	private Integer social;

	private Integer total;
	private Integer average;
	private String grade;
	private String result;

	// --- Constructors ---
	public StudentDashBoard() {
	}

	public StudentDashBoard(String regNo, String name, Integer tamil, Integer english, Integer maths, Integer science,
			Integer social, Integer total, Integer average, String grade, String result) {
		this.regNo = regNo;
		this.name = name;
		this.tamil = tamil;
		this.english = english;
		this.maths = maths;
		this.science = science;
		this.social = social;
		this.total = total;
		this.average = average;
		this.grade = grade;
		this.result = result;
	}

	// --- Getters & Setters ---

	public String getRegNo() {
		return regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Integer getAverage() {
		return average;
	}

	public void setAverage(Integer average) {
		this.average = average;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
}
