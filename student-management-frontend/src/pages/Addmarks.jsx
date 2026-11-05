import { useState } from "react";
import { addMarks } from "../services/adminService";
import NavbarAdmin from "../components/NavbarAdmin";
import "./AddMarks.css";

export default function AddMarks() {
  const [marks, setMarks] = useState({
    regNo: "",
    maths: "",
    science: "",
    social: "",
    tamil: "",
    english: ""
  });

  const handleSave = async () => {
    await addMarks(marks);
    alert("Marks added!");
  };

  return (
    <>
     

      <div className="add-marks-page">
        <div className="add-marks-card">

          <h3>Add Marks</h3>

          <input className="form-control mb-2" placeholder="Reg No"
            onChange={(e) => setMarks({ ...marks, regNo: e.target.value })} />

          <input className="form-control mb-2" placeholder="Maths"
            onChange={(e) => setMarks({ ...marks, maths: e.target.value })} />

          <input className="form-control mb-2" placeholder="Science"
            onChange={(e) => setMarks({ ...marks, science: e.target.value })} />

          <input className="form-control mb-2" placeholder="Social"
            onChange={(e) => setMarks({ ...marks, social: e.target.value })} />

          <input className="form-control mb-2" placeholder="Tamil"
            onChange={(e) => setMarks({ ...marks, tamil: e.target.value })} />

          <input className="form-control mb-2" placeholder="English"
            onChange={(e) => setMarks({ ...marks, english: e.target.value })} />

          <button className="btn btn-primary w-100" onClick={handleSave}>Save</button>

        </div>
      </div>
    </>
  );
}
