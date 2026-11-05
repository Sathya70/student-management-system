import { Link } from "react-router-dom";

export default function NavbarStudent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/student/dashboard">
          Student Panel
        </Link>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/student/dashboard">
              View Marks
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/student/attendance">
              Attendance
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/student/rank">
              Rank
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-light btn-sm ms-3"
              onClick={() => {
                localStorage.removeItem("student");
                localStorage.removeItem("regNo");
                window.location.href = "/student-login";
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
