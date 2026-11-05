package com.example.student.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.student.Model.Attendance;
import com.example.student.repository.AttendanceRepository;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin
public class AttendanceController {

	@Autowired
	private AttendanceRepository attendanceRepository;

	@PostMapping
	public Attendance addAttendance(@RequestBody Attendance attendance) {
		return attendanceRepository.save(attendance);
	}

	@GetMapping
	public List<Attendance> getAllAttendance() {
		return attendanceRepository.findAll();
	}

	@GetMapping("/regno/{regNo}")
	public List<Attendance> getAttendanceByRegNo(@PathVariable String regNo) {
		return attendanceRepository.findByRegNo(regNo);
	}

	@GetMapping("/summary")
	public List<Map<String, Object>> getAttendanceSummary() {
		List<Attendance> all = attendanceRepository.findAll();
		Map<String, Map<String, Object>> grouped = new LinkedHashMap<>();

		for (Attendance attendance : all) {
			String regNo = attendance.getRegNo();
			Map<String, Object> summary = grouped.computeIfAbsent(regNo, key -> {
				Map<String, Object> map = new LinkedHashMap<>();
				map.put("regNo", key);
				map.put("presentDays", 0L);
				map.put("absentDays", 0L);
				map.put("totalDays", 0L);
				return map;
			});

			long totalDays = ((Long) summary.get("totalDays")) + 1;
			summary.put("totalDays", totalDays);

			if ("P".equalsIgnoreCase(attendance.getStatus())) {
				summary.put("presentDays", ((Long) summary.get("presentDays")) + 1);
			} else {
				summary.put("absentDays", ((Long) summary.get("absentDays")) + 1);
			}
		}

		for (Map<String, Object> summary : grouped.values()) {
			long presentDays = (Long) summary.get("presentDays");
			long totalDays = (Long) summary.get("totalDays");
			double percentage = totalDays == 0 ? 0.0 : (presentDays * 100.0 / totalDays);
			summary.put("percentage", Math.round(percentage * 100.0) / 100.0);
		}

		return new ArrayList<>(grouped.values());
	}

}
