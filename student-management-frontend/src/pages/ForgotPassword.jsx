import { useState } from "react";
import { forgotPasswordRequest, resetPassword } from "../services/studentService";
import "./StudentLogin.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState(1);
  const [message, setMessage] = useState("");

  const requestReset = async () => {
    const response = await forgotPasswordRequest(email, regNo);
    if (response.ok) {
      setStage(2);
      setMessage("Student verified. Enter new password.");
    } else {
      const data = await response.json();
      setMessage(data.message || "Student not found.");
    }
  };

  const handleReset = async () => {
    const response = await resetPassword(email, regNo, password);
    if (response.ok) {
      setMessage("Password reset successfully. You may log in now.");
      setStage(1);
      setEmail("");
      setRegNo("");
      setPassword("");
    } else {
      const data = await response.json();
      setMessage(data.message || "Password reset failed.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h3>Forgot Password</h3>

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

        {stage === 1 ? (
          <button className="btn btn-primary w-100" onClick={requestReset}>
            Verify Student
          </button>
        ) : (
          <>
            <input
              type="password"
              className="form-control mb-2"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary w-100" onClick={handleReset}>
              Reset Password
            </button>
          </>
        )}

        {message && <p className="mt-3 alert alert-info">{message}</p>}
      </div>
    </div>
  );
}
