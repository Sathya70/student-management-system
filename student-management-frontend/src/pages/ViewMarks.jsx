import { useEffect, useState } from "react";
import { getMarks } from "../services/adminService";
import NavbarAdmin from "../components/NavbarAdmin";
import "./ViewMarks.css";   // <-- ADD THIS

export default function ViewMarks() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getMarks();
    setMarks(res.data);
  };

  return (
    <>
  

      <div className="view-marks-container">
        <div className="view-marks-card">
          <h3 className="view-title">Marks List</h3>

          <table className="styled-table">
            <thead>
              <tr>
                <th>Reg No</th>
                <th>Maths</th>
                <th>Science</th>
                <th>Social</th>
                <th>Tamil</th>
                <th>English</th>
                <th>Total</th>
                <th>Average</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {marks.map((m) => (
                <tr key={m.id}>
                  <td>{m.regNo}</td>
                  <td>{m.maths}</td>
                  <td>{m.science}</td>
                  <td>{m.social}</td>
                  <td>{m.tamil}</td>
                  <td>{m.english}</td>
                  <td>{m.total}</td>
                  <td>{m.average}</td>
                  <td>{m.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}
