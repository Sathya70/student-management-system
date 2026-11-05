import { useEffect, useState } from "react";
import { getMarksByRegNo } from "../services/studentService";
import NavbarStudent from "../components/NavbarStudent";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const [marks, setMarks] = useState(null);

  const regNo =
    JSON.parse(localStorage.getItem("student"))?.regNo ||
    localStorage.getItem("regNo");

  useEffect(() => {
    if (!regNo) {
      console.error("REG NO IS MISSING");
      return;
    }

    getMarksByRegNo(regNo)
      .then((data) => setMarks(data))
      .catch((err) => console.error("Failed to fetch marks:", err));
  }, [regNo]);

  return (
    <>
      <NavbarStudent />
      <div className="dashboard-page">
        <div className="dashboard-card">
          <h2>Your Marks</h2>

          {!marks ? (
            <p>No marks found.</p>
          ) : (
            <>
              <div className="marks-row"><b>Reg No:</b> {marks.regNo}</div>
              <div className="marks-row"><b>Maths:</b> {marks.maths}</div>
              <div className="marks-row"><b>Science:</b> {marks.science}</div>
              <div className="marks-row"><b>Social:</b> {marks.social}</div>
              <div className="marks-row"><b>Tamil:</b> {marks.tamil}</div>
              <div className="marks-row"><b>English:</b> {marks.english}</div>
              <div className="marks-row"><b>Total:</b> {marks.total}</div>
              <div className="marks-row"><b>Average:</b> {marks.avg}</div>
              <div className="marks-row"><b>Grade:</b> {marks.grade}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
