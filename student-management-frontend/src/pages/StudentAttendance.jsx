import { useEffect, useState } from "react";
import { getAttendanceByRegNo } from "../services/studentService";
import NavbarStudent from "../components/NavbarStudent";

export default function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const regNo = JSON.parse(localStorage.getItem("student"))?.regNo;

  useEffect(() => {
    if (regNo) {
      getAttendanceByRegNo(regNo).then((data) => setAttendance(data)).catch(() => setAttendance([]));
    }
  }, [regNo]);

  return (
    <>
      <NavbarStudent />
      <div className="container mt-4">
        <h2>Your Attendance</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((row) => (
              <tr key={row.id}>
                <td>{row.date}</td>
                <td>{row.status === "P" ? "Present" : "Absent"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
