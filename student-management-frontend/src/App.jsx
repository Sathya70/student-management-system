import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";
import ForgotPassword from "./pages/ForgotPassword";

import AdminDashboard from "./pages/AdminDashboard";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminRank from "./pages/AdminRank";
import AdminAttendance from "./pages/AdminAttendance";
import StudentDashboard from "./pages/StudentDashboard";
import StudentRank from "./pages/StudentRank";
import StudentAttendance from "./pages/StudentAttendance";

import AddStudent from "./pages/AddStudent";
import AddMarks from "./pages/AddMarks";
import ViewStudents from "./pages/ViewStudents";
import ViewMarks from "./pages/ViewMarks";
import UpdateStudent from "./pages/UpdateStudent";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/rank" element={<AdminRank />} />
        <Route path="/admin/attendance" element={<AdminAttendance />} />

        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/add-marks" element={<AddMarks />} />
        <Route path="/admin/view-students" element={<ViewStudents />} />
        <Route path="/admin/view-marks" element={<ViewMarks />} />
        <Route path="/admin/update-student/:id" element={<UpdateStudent />} />

        {/* Student */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/rank" element={<StudentRank />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/forgot-password" element={<ForgotPassword />} />

      </Routes>
    </BrowserRouter>
  );
}
