import { Link } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <>
      <NavbarAdmin />
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-card">
          <h2 className="dashboard-title">Admin Dashboard</h2>

          <div className="dashboard-buttons">
            <Link className="btn btn-dark m-2 dashboard-btn" to="/admin/add-student">Add Student</Link>
            <Link className="btn btn-success m-2 dashboard-btn" to="/admin/view-students">View Students</Link>
            <Link className="btn btn-primary m-2 dashboard-btn" to="/admin/add-marks">Add Marks</Link>
            <Link className="btn btn-info m-2 dashboard-btn" to="/admin/view-marks">View Marks</Link>
            <Link className="btn btn-warning m-2 dashboard-btn" to="/admin/analytics">Analytics</Link>
            <Link className="btn btn-secondary m-2 dashboard-btn" to="/admin/rank">Rank</Link>
            <Link className="btn btn-success m-2 dashboard-btn" to="/admin/attendance">Attendance</Link>
          </div>
        </div>
      </div>
    </>
  );
}
