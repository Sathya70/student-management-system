package com.example.student.dto;

public class MarkAnalyticsDto {

	private long totalStudents;
	private long passCount;
	private long failCount;

	private int highestTotal;
	private String topStudentName;
	private String topStudentRegNo;

	private double avgTamil;
	private double avgEnglish;
	private double avgMaths;
	private double avgScience;
	private double avgSocial;

	// Getters & Setters
	public long getTotalStudents() {
		return totalStudents;
	}

	public void setTotalStudents(long totalStudents) {
		this.totalStudents = totalStudents;
	}

	public long getPassCount() {
		return passCount;
	}

	public void setPassCount(long passCount) {
		this.passCount = passCount;
	}

	public long getFailCount() {
		return failCount;
	}

	public void setFailCount(long failCount) {
		this.failCount = failCount;
	}

	public int getHighestTotal() {
		return highestTotal;
	}

	public void setHighestTotal(int highestTotal) {
		this.highestTotal = highestTotal;
	}

	public String getTopStudentName() {
		return topStudentName;
	}

	public void setTopStudentName(String topStudentName) {
		this.topStudentName = topStudentName;
	}

	public String getTopStudentRegNo() {
		return topStudentRegNo;
	}

	public void setTopStudentRegNo(String topStudentRegNo) {
		this.topStudentRegNo = topStudentRegNo;
	}

	public double getAvgTamil() {
		return avgTamil;
	}

	public void setAvgTamil(double avgTamil) {
		this.avgTamil = avgTamil;
	}

	public double getAvgEnglish() {
		return avgEnglish;
	}

	public void setAvgEnglish(double avgEnglish) {
		this.avgEnglish = avgEnglish;
	}

	public double getAvgMaths() {
		return avgMaths;
	}

	public void setAvgMaths(double avgMaths) {
		this.avgMaths = avgMaths;
	}

	public double getAvgScience() {
		return avgScience;
	}

	public void setAvgScience(double avgScience) {
		this.avgScience = avgScience;
	}

	public double getAvgSocial() {
		return avgSocial;
	}

	public void setAvgSocial(double avgSocial) {
		this.avgSocial = avgSocial;
	}
}
