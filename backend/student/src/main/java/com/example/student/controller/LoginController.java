package com.example.student.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.student.Model.Student;
import com.example.student.repository.StudentRepository;

@RestController
@RequestMapping("api/students")
@CrossOrigin
public class LoginController {

	@Autowired
	private StudentRepository studentRepo;

	@PostMapping("/login")
	public ResponseEntity<Student> studentLogin(@RequestBody Map<String, String> loginData) {

		String email = loginData.get("email");
		String regNo = loginData.get("regNo");
		String password = loginData.get("password");

		return studentRepo.findByEmailAndRegNoAndPassword(email, regNo, password).map(ResponseEntity::ok)
				.orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
	}

	@PostMapping("/admin")
	public ResponseEntity<Map<String, String>> adminLogin(@RequestBody Map<String, String> loginData) {
		if ("admin@example.com".equals(loginData.get("email")) && "admin123".equals(loginData.get("password"))) {
			return ResponseEntity.ok(Map.of("message", "Admin login successful"));
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

	@PostMapping("/forgot-password/request")
	public ResponseEntity<Map<String, String>> requestForgotPassword(@RequestBody Map<String, String> requestData) {
		String email = requestData.get("email");
		String regNo = requestData.get("regNo");

		Optional<Student> student = studentRepo.findByEmailAndRegNo(email, regNo);
		if (student.isPresent()) {
			return ResponseEntity.ok(Map.of("message", "Student found. You may now reset your password."));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(Map.of("message", "No student found with the provided email and register number."));
	}

	@PutMapping("/forgot-password/reset")
	public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> requestData) {
		String email = requestData.get("email");
		String regNo = requestData.get("regNo");
		String newPassword = requestData.get("password");

		return studentRepo.findByEmailAndRegNo(email, regNo).map(student -> {
			student.setPassword(newPassword);
			studentRepo.save(student);
			return ResponseEntity.ok(Map.of("message", "Password reset successfully."));
		}).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(Map.of("message", "No student found with the provided email and register number.")));
	}
}
