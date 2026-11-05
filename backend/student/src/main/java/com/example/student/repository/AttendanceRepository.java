package com.example.student.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.student.Model.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
	List<Attendance> findByRegNo(String regNo);
}
