import { Link } from "react-router-dom";
import "./Home.css";   // <-- IMPORTANT: add this

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-card">

        <img
          src="./studentimage.webg" 
          alt="Student Management"
          className="home-img"
        />

        <h2 className="title">Student Management System</h2>
        <p className="subtitle">Choose your module</p>

        <div className="button-group">
          <Link to="/admin-login" className="btn btn-dark btn-custom">
            Admin Module
          </Link>
          <Link to="/student-login" className="btn btn-primary btn-custom">
            Student Module
          </Link>
        </div>
      </div>
    </div>
  );
}
