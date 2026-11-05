import { useEffect, useState } from "react";
import { getRank } from "../services/adminService";
import NavbarAdmin from "../components/NavbarAdmin";

export default function AdminRank() {
  const [rankList, setRankList] = useState([]);

  useEffect(() => {
    getRank().then((res) => setRankList(res.data));
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="container mt-4">
        <h2>Rank System</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Reg No</th>
              <th>Name</th>
              <th>Total</th>
              <th>Average</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {rankList.map((item, idx) => (
              <tr key={idx}>
                <td>{item.rank}</td>
                <td>{item.regNo}</td>
                <td>{item.name}</td>
                <td>{item.total}</td>
                <td>{item.average}</td>
                <td>{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
