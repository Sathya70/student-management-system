package com.example.student.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.student.Model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

	Optional<Student> findByEmailAndPassword(String email, String password);

	Optional<Student> findByEmailAndRegNoAndPassword(String email, String regNo, String password);

	Optional<Student> findByEmailAndRegNo(String email, String regNo);

	Optional<Student> findByRegNo(String regNo);
}
