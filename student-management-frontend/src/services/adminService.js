import api from "./api";

export const adminLogin = (username, password) =>
  api.post("/students/admin", { email: username, password });

export const addStudent = (student) =>
  api.post("/students", student);

export const getStudents = () =>
  api.get("/students");

export const deleteStudent = (id) =>
  api.delete(`/students/${id}`);

export const addMarks = (marks) =>
  api.post("/marks", marks);

export const getMarks = () =>
  api.get("/marks");

export const getAnalytics = () =>
  api.get("/marks/analytics");

export const getRank = () =>
  api.get("/marks/rank");

export const getAttendance = () =>
  api.get("/attendance");

export const getAttendanceSummary = () =>
  api.get("/attendance/summary");

export const addAttendance = (attendance) =>
  api.post("/attendance", attendance);

export const exportStudentsPdf = () =>
  api.get("/students/export/pdf", { responseType: "blob" });

export const exportStudentsExcel = () =>
  api.get("/students/export/excel", { responseType: "blob" });

export const exportMarksPdf = () =>
  api.get("/marks/export/pdf", { responseType: "blob" });

export const exportMarksExcel = () =>
  api.get("/marks/export/excel", { responseType: "blob" });
