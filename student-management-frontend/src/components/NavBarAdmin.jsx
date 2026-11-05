import { Link } from "react-router-dom";

export default function NavbarAdmin() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin/dashboard">Admin Panel</Link>

        <ul className="navbar-nav ms-3">
          <li className="nav-item"><Link className="nav-link" to="/admin/add-student">Add Student</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/admin/view-students">View Students</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/admin/add-marks">Add Marks</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/admin/view-marks">View Marks</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/admin/analytics">Analytics</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/admin/rank">Rank</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/admin/attendance">Attendance</Link></li>
        </ul>
      </div>
    </nav>
  );
}
