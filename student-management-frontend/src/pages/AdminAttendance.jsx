import { useEffect, useState } from "react";
import { getAttendanceSummary, addAttendance } from "../services/adminService";
import NavbarAdmin from "../components/NavbarAdmin";

export default function AdminAttendance() {
  const [summary, setSummary] = useState([]);
  const [attendance, setAttendance] = useState({ regNo: "", date: "", status: "P" });

  useEffect(() => {
    getAttendanceSummary().then((res) => setSummary(res.data));
  }, []);

  const handleSave = async () => {
    if (!attendance.regNo || !attendance.date) {
      alert("Please provide reg no and date.");
      return;
    }
    await addAttendance(attendance);
    alert("Attendance added.");
    setAttendance({ regNo: "", date: "", status: "P" });
    setSummary((current) => current);
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container mt-4">
        <h2>Attendance Module</h2>
        <div className="card p-4 mb-4">
          <div className="row g-2">
            <div className="col-md-3">
              <input className="form-control" placeholder="Reg No" value={attendance.regNo} onChange={(e) => setAttendance({ ...attendance, regNo: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input type="date" className="form-control" value={attendance.date} onChange={(e) => setAttendance({ ...attendance, date: e.target.value })} />
            </div>
            <div className="col-md-3">
              <select className="form-select" value={attendance.status} onChange={(e) => setAttendance({ ...attendance, status: e.target.value })}>
                <option value="P">Present</option>
                <option value="A">Absent</option>
              </select>
            </div>
            <div className="col-md-3">
              <button className="btn btn-primary w-100" onClick={handleSave}>Save Attendance</button>
            </div>
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Reg No</th>
              <th>Present Days</th>
              <th>Absent Days</th>
              <th>Total Days</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item, idx) => (
              <tr key={idx}>
                <td>{item.regNo}</td>
                <td>{item.presentDays}</td>
                <td>{item.absentDays}</td>
                <td>{item.totalDays}</td>
                <td>{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
