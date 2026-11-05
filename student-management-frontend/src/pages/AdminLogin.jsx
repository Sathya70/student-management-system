import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";   // <-- IMPORTANT

export default function AdminLogin() {
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const navigate = useNavigate();

    const handleAdminLogin = async () => {
        const res = await fetch("http://localhost:8080/api/students/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: adminEmail,
                password: adminPassword
            })
        });

        if (res.ok) {
            alert("Admin Login Successful");
            navigate("/admin/dashboard");
        } else {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-card">
                <h2 className="admin-title">Admin Login</h2>

                <input
                    type="text"
                    placeholder="Email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="admin-input"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="admin-input"
                />

                <button onClick={handleAdminLogin} className="admin-btn">
                    Login
                </button>
            </div>
        </div>
    );
}
