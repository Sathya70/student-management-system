import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateStudent.css";   // ✅ IMPORT CSS

export default function UpdateStudent() {
  const navigate = useNavigate();

  const [regNo, setRegNo] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch student
  const fetchStudent = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/students/${regNo}`);
      if (!res.ok) {
        setMessage("Student not found");
        setStudent(null);
        return;
      }
      const data = await res.json();
      setStudent(data);
      setMessage("");
    } catch (e) {
      setMessage("Error fetching student");
    }
  };

  // Update student
  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/students/update/${regNo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      });

      if (res.ok) {
        alert("Student Updated Successfully!");
        navigate("/admin-dashboard");
      } else {
        setMessage("Update failed");
      }
    } catch (e) {
      setMessage("Error updating student");
    }
  };

  return (
    <div className="update-container">
      <h2 className="update-title">Update Student</h2>

      {/* Search box */}
      <div className="search-box shadow-sm p-3">
        <label className="form-label fw-bold">Enter Register Number:</label>
        <input
          type="text"
          className="form-control"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={fetchStudent}>
          Search
        </button>
      </div>

      {/* Loaded student form */}
      {student && (
        <form onSubmit={updateStudent} className="update-card shadow">

          <p className="reg-display"><b>Reg No:</b> {student.regNo}</p>

          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Age</label>
            <input
              type="number"
              className="form-control"
              value={student.age}
              onChange={(e) => setStudent({ ...student, age: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Class</label>
            <input
              type="text"
              className="form-control"
              value={student.studentClass}
              onChange={(e) =>
                setStudent({ ...student, studentClass: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={student.email}
              onChange={(e) => setStudent({ ...student, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              value={student.address}
              onChange={(e) =>
                setStudent({ ...student, address: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              value={student.password}
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
              }
            />
          </div>

          <button className="btn btn-success w-100 mt-2" type="submit">
            Update Student
          </button>
        </form>
      )}

      {message && <p className="alert alert-info mt-3">{message}</p>}
    </div>
  );
}
