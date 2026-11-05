import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css";   // <-- ADD THIS

export default function AddStudent() {

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    regNo: "",
    name: "",
    age: "",
    studentClass: "",
    email: "",
    address: "",
    password: ""
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const saveStudent = async () => {
    try {
      await axios.post("http://localhost:8080/api/students", student);
      alert("Student Added Successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
      alert("Error: Check server logs");
    }
  };

  return (
    <div className="add-student-container">
      <div className="add-student-card">

        <h2 className="add-title">Add Student</h2>

        <input
          type="text"
          name="regNo"
          placeholder="Register Number"
          value={student.regNo}
          onChange={handleChange}
          className="add-input"
        />

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
          className="add-input"
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={student.age}
          onChange={handleChange}
          className="add-input"
        />

        <input
          type="text"
          name="studentClass"
          placeholder="Class"
          value={student.studentClass}
          onChange={handleChange}
          className="add-input"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          className="add-input"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={student.address}
          onChange={handleChange}
          className="add-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={student.password}
          onChange={handleChange}
          className="add-input"
        />

        <button onClick={saveStudent} className="add-btn">
          Save
        </button>

      </div>
    </div>
  );
}
