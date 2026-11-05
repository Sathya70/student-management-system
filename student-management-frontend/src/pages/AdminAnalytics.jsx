import { useEffect, useState } from "react";
import { getAnalytics, exportMarksPdf, exportMarksExcel, exportStudentsPdf, exportStudentsExcel } from "../services/adminService";
import NavbarAdmin from "../components/NavbarAdmin";

function saveFile(blob, fileName) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    getAnalytics().then((res) => setAnalytics(res.data));
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="container mt-4">
        <h2>Analytics</h2>
        {!analytics ? (
          <p>Loading analytics...</p>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div className="card p-3 mb-3">
                <h5>Total Students</h5>
                <p>{analytics.totalStudents}</p>
                <h5>Pass Count</h5>
                <p>{analytics.passCount}</p>
                <h5>Fail Count</h5>
                <p>{analytics.failCount}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-3 mb-3">
                <h5>Top Student</h5>
                <p>{analytics.topStudentName} ({analytics.topStudentRegNo})</p>
                <h5>Highest Total</h5>
                <p>{analytics.highestTotal}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3">
          <button className="btn btn-primary me-2" onClick={async () => saveFile(await exportMarksPdf().then((res) => res.data), "marks-report.pdf")}>Export Marks PDF</button>
          <button className="btn btn-secondary me-2" onClick={async () => saveFile(await exportMarksExcel().then((res) => res.data), "marks-report.csv")}>Export Marks CSV</button>
          <button className="btn btn-success me-2" onClick={async () => saveFile(await exportStudentsPdf().then((res) => res.data), "students-report.pdf")}>Export Students PDF</button>
          <button className="btn btn-info" onClick={async () => saveFile(await exportStudentsExcel().then((res) => res.data), "students-report.csv")}>Export Students CSV</button>
        </div>
      </div>
    </>
  );
}
