package com.example.student.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.student.Model.Student;
import com.example.student.repository.StudentRepository;
import com.example.student.util.ExportUtil;

@RestController
@RequestMapping("api/students")
@CrossOrigin
public class StudentController {

	private final StudentRepository studentRepo;

	public StudentController(StudentRepository studentRepo) {
		this.studentRepo = studentRepo;
	}

	@PostMapping
	public Student addStudent(@RequestBody Student student) {
		return studentRepo.save(student);
	}

	@GetMapping
	public List<Student> getAllStudents() {
		return studentRepo.findAll();
	}

	@GetMapping("/{regNo}")
	public Student getStudent(@PathVariable String regNo) {
		return studentRepo.findByRegNo(regNo).orElse(null);
	}

	@GetMapping("/id/{id}")
	public Student getStudentById(@PathVariable Integer id) {
		return studentRepo.findById(id).orElse(null);
	}

	@PutMapping("/update/{regNo}")
	public Student updateStudent(@PathVariable String regNo, @RequestBody Student updated) {
		return studentRepo.findByRegNo(regNo).map(student -> {
			student.setName(updated.getName());
			student.setAge(updated.getAge());
			student.setStudentClass(updated.getStudentClass());
			student.setEmail(updated.getEmail());
			student.setAddress(updated.getAddress());
			student.setPassword(updated.getPassword());
			return studentRepo.save(student);
		}).orElse(null);
	}

	@DeleteMapping("/{id}")
	public void deleteStudent(@PathVariable Integer id) {
		studentRepo.deleteById(id);
	}

	@GetMapping("/export/pdf")
	public ResponseEntity<byte[]> exportStudentsPdf() throws IOException {
		List<Student> students = studentRepo.findAll();
		List<String> lines = new ArrayList<>();
		lines.add("RegNo | Name | Email | Class | Age | Address");
		for (Student student : students) {
			lines.add(String.format("%s | %s | %s | %s | %d | %s", student.getRegNo(), student.getName(),
					student.getEmail(), student.getStudentClass(), student.getAge(), student.getAddress()));
		}
		byte[] pdf = ExportUtil.generatePdf("Student List", lines);
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=students-report.pdf");
		return ResponseEntity.ok().headers(headers).body(pdf);
	}

	@GetMapping("/export/excel")
	public ResponseEntity<byte[]> exportStudentsExcel() throws IOException {
		List<Student> students = studentRepo.findAll();
		List<String[]> rows = new ArrayList<>();
		rows.add(new String[] { "RegNo", "Name", "Email", "Class", "Age", "Address" });
		for (Student student : students) {
			rows.add(new String[] { student.getRegNo(), student.getName(), student.getEmail(),
					student.getStudentClass(), String.valueOf(student.getAge()), student.getAddress() });
		}
		byte[] csv = ExportUtil.generateCsv(rows);
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=students-report.csv");
		return ResponseEntity.ok().headers(headers).body(csv);
	}
}
