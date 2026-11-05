import { useEffect, useState } from "react";
import { getRankByRegNo } from "../services/studentService";
import NavbarStudent from "../components/NavbarStudent";

export default function StudentRank() {
  const [rankData, setRankData] = useState(null);
  const regNo = JSON.parse(localStorage.getItem("student"))?.regNo;

  useEffect(() => {
    if (regNo) {
      getRankByRegNo(regNo).then((data) => setRankData(data)).catch(() => null);
    }
  }, [regNo]);

  return (
    <>
      <NavbarStudent />
      <div className="container mt-4">
        <h2>Your Rank</h2>
        {!rankData ? (
          <p>Loading rank...</p>
        ) : (
          <div className="card p-4">
            <p><strong>Rank:</strong> {rankData.rank}</p>
            <p><strong>Reg No:</strong> {rankData.regNo}</p>
            <p><strong>Name:</strong> {rankData.name}</p>
            <p><strong>Total:</strong> {rankData.total}</p>
            <p><strong>Average:</strong> {rankData.average}</p>
            <p><strong>Grade:</strong> {rankData.grade}</p>
          </div>
        )}
      </div>
    </>
  );
}
