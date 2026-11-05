import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { studentLogin } from "../services/studentService";
import "./StudentLogin.css";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await studentLogin(email, regNo, password);

      localStorage.setItem("student", JSON.stringify(data));
      navigate("/student/dashboard");
    } catch (error) {
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h3>Student Login</h3>

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Registration No"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>

        <p className="mt-3 text-center">
          <Link to="/student/forgot-password">Forgot password?</Link>
        </p>
      </div>
    </div>
  );
}
