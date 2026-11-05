package com.example.student.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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

import com.example.student.Model.Marks;
import com.example.student.Model.Student;
import com.example.student.dto.MarkAnalyticsDto;
import com.example.student.repository.MarksRepository;
import com.example.student.repository.StudentRepository;
import com.example.student.util.ExportUtil;

@RestController
@CrossOrigin
@RequestMapping("/api/marks")
public class MarkController {

	@Autowired
	private MarksRepository marksRepository;

	@Autowired
	private StudentRepository studentRepository;

	@GetMapping
	public List<Marks> getAllMarks() {
		return marksRepository.findAll();
	}

	@PostMapping
	public Marks addMarks(@RequestBody Marks marks) {
		return marksRepository.save(marks);
	}

	@GetMapping("/regno/{regNo}")
	public Marks getMarksByRegNo(@PathVariable String regNo) {
		return marksRepository.findByRegNo(regNo);
	}

	@PutMapping("/regno/{regNo}")
	public Marks updateMarksByRegNo(@PathVariable String regNo, @RequestBody Marks marksDetails) {
		Marks marks = marksRepository.findByRegNo(regNo);
		if (marks != null) {
			marks.setMaths(marksDetails.getMaths());
			marks.setScience(marksDetails.getScience());
			marks.setSocial(marksDetails.getSocial());
			marks.setTamil(marksDetails.getTamil());
			marks.setEnglish(marksDetails.getEnglish());
			return marksRepository.save(marks);
		}
		return null;
	}

	@DeleteMapping("/regno/{regNo}")
	public String deleteMarksByRegNo(@PathVariable String regNo) {
		Marks marks = marksRepository.findByRegNo(regNo);
		if (marks != null) {
			marksRepository.delete(marks);
			return "Deleted successfully!";
		}
		return "No record found!";
	}

	@GetMapping("/analytics")
	public MarkAnalyticsDto getAnalytics() {
		List<Marks> all = marksRepository.findAll();
		MarkAnalyticsDto analytics = new MarkAnalyticsDto();

		if (all.isEmpty()) {
			return analytics;
		}

		analytics.setTotalStudents(all.size());

		int highestTotal = Integer.MIN_VALUE;
		String topStudentName = "";
		String topStudentRegNo = "";

		int tamilSum = 0;
		int englishSum = 0;
		int mathsSum = 0;
		int scienceSum = 0;
		int socialSum = 0;
		long passCount = 0;
		long failCount = 0;

		for (Marks marks : all) {
			int total = marks.getTotal() == null ? 0 : marks.getTotal();
			double avg = marks.getAverage() == null ? 0.0 : marks.getAverage();

			tamilSum += marks.getTamil() == null ? 0 : marks.getTamil();
			englishSum += marks.getEnglish() == null ? 0 : marks.getEnglish();
			mathsSum += marks.getMaths() == null ? 0 : marks.getMaths();
			scienceSum += marks.getScience() == null ? 0 : marks.getScience();
			socialSum += marks.getSocial() == null ? 0 : marks.getSocial();

			if (avg >= 50) {
				passCount++;
			} else {
				failCount++;
			}

			if (total > highestTotal) {
				highestTotal = total;
				topStudentRegNo = marks.getRegNo();
				Optional<Student> student = studentRepository.findByRegNo(marks.getRegNo());
				topStudentName = student.map(Student::getName).orElse("Unknown");
			}
		}

		analytics.setPassCount(passCount);
		analytics.setFailCount(failCount);
		analytics.setHighestTotal(highestTotal == Integer.MIN_VALUE ? 0 : highestTotal);
		analytics.setTopStudentName(topStudentName);
		analytics.setTopStudentRegNo(topStudentRegNo);
		analytics.setAvgTamil(all.size() == 0 ? 0 : tamilSum / (double) all.size());
		analytics.setAvgEnglish(all.size() == 0 ? 0 : englishSum / (double) all.size());
		analytics.setAvgMaths(all.size() == 0 ? 0 : mathsSum / (double) all.size());
		analytics.setAvgScience(all.size() == 0 ? 0 : scienceSum / (double) all.size());
		analytics.setAvgSocial(all.size() == 0 ? 0 : socialSum / (double) all.size());

		return analytics;
	}

	@GetMapping("/rank")
	public List<Map<String, Object>> getRankList() {
		List<Marks> all = marksRepository.findAll();
		List<Map<String, Object>> ranks = new ArrayList<>();

		all.stream().map(marks -> {
			Map<String, Object> item = new LinkedHashMap<>();
			item.put("regNo", marks.getRegNo());
			item.put("name", studentRepository.findByRegNo(marks.getRegNo()).map(Student::getName).orElse("Unknown"));
			item.put("total", marks.getTotal());
			item.put("average", marks.getAverage());
			item.put("grade", marks.getGrade());
			return item;
		}).sorted((a, b) -> Integer.compare((Integer) b.get("total"), (Integer) a.get("total"))).forEach(ranks::add);

		int currentRank = 1;
		int previousTotal = -1;
		for (int i = 0; i < ranks.size(); i++) {
			Map<String, Object> row = ranks.get(i);
			int total = (Integer) row.get("total");
			if (i > 0 && total < previousTotal) {
				currentRank = i + 1;
			}
			row.put("rank", currentRank);
			previousTotal = total;
		}

		return ranks;
	}

	@GetMapping("/rank/{regNo}")
	public ResponseEntity<Map<String, Object>> getRankByRegNo(@PathVariable String regNo) {
		List<Map<String, Object>> ranks = getRankList();
		return ranks.stream().filter(row -> regNo.equalsIgnoreCase((String) row.get("regNo"))).findFirst()
				.map(ResponseEntity::ok).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}

	@GetMapping("/export/pdf")
	public ResponseEntity<byte[]> exportMarksPdf() throws IOException {
		List<Marks> marks = marksRepository.findAll();
		List<String> lines = new ArrayList<>();
		lines.add("RegNo | Maths | Science | Social | Tamil | English | Total | Avg | Grade");

		for (Marks item : marks) {
			lines.add(String.format("%s | %d | %d | %d | %d | %d | %d | %.2f | %s", item.getRegNo(), item.getMaths(),
					item.getScience(), item.getSocial(), item.getTamil(), item.getEnglish(), item.getTotal(),
					item.getAverage(), item.getGrade()));
		}

		byte[] pdf = ExportUtil.generatePdf("Marks Report", lines);
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=marks-report.pdf");
		return ResponseEntity.ok().headers(headers).body(pdf);
	}

	@GetMapping("/export/excel")
	public ResponseEntity<byte[]> exportMarksExcel() throws IOException {
		List<Marks> marks = marksRepository.findAll();
		List<String[]> rows = new ArrayList<>();
		rows.add(new String[] { "RegNo", "Maths", "Science", "Social", "Tamil", "English", "Total", "Average",
				"Grade" });
		for (Marks item : marks) {
			rows.add(new String[] { item.getRegNo(), String.valueOf(item.getMaths()), String.valueOf(item.getScience()),
					String.valueOf(item.getSocial()), String.valueOf(item.getTamil()),
					String.valueOf(item.getEnglish()), String.valueOf(item.getTotal()),
					String.format("%.2f", item.getAverage()), item.getGrade() });
		}

		byte[] csv = ExportUtil.generateCsv(rows);
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=marks-report.csv");
		return ResponseEntity.ok().headers(headers).body(csv);
	}
}
