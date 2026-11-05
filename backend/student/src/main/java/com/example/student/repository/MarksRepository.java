package com.example.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.student.Model.Marks;

public interface MarksRepository extends JpaRepository<Marks, Integer> {
	Marks findByRegNo(String regNo);

}
