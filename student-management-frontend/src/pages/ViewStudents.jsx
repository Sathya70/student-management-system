import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import "./ViewStudent.css";

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const loadStudents = async () => {
    const res = await axios.get("http://localhost:8080/api/students");
    setStudents(res.data);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/api/students/${id}`);
    loadStudents();
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <>
      

      {/* Apply correct class */}
      <div className="view-students-container">

        <h3 className="view-students-title">Students List</h3>

        {/* Apply custom table class */}
        <table className="table table-custom">
          <thead>
            <tr>
              <th>Reg No</th>
              <th>Name</th>
              <th>Email</th>
              <th style={{ width: "180px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((stu) => (
              <tr key={stu.id}>
                <td>{stu.regNo}</td>
                <td>{stu.name}</td>
                <td>{stu.email}</td>

                <td>
                  {/* Apply correct button styles */}
                  <button
                    className="btn-update me-2"
                    onClick={() => navigate(`/admin/update-student/${stu.id}`)}
                  >
                    Update
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() => deleteStudent(stu.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </>
  );
}
