const BASE_URL = "http://localhost:8080";

// STUDENT LOGIN
export async function studentLogin(email, regNo, password) {
  const response = await fetch(`${BASE_URL}/api/students/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, regNo, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}

// GET MARKS BY REG NO
export async function getMarksByRegNo(regNo) {
  const response = await fetch(`${BASE_URL}/api/marks/regno/${regNo}`);

  if (!response.ok) {
    throw new Error("Failed to fetch marks");
  }

  return await response.json();
}

export async function forgotPasswordRequest(email, regNo) {
  const response = await fetch(`${BASE_URL}/api/students/forgot-password/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, regNo }),
  });

  return response;
}

export async function resetPassword(email, regNo, password) {
  const response = await fetch(`${BASE_URL}/api/students/forgot-password/reset`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, regNo, password }),
  });

  return response;
}

export async function getAttendanceByRegNo(regNo) {
  const response = await fetch(`${BASE_URL}/api/attendance/regno/${regNo}`);
  if (!response.ok) {
    throw new Error("Failed to fetch attendance");
  }
  return await response.json();
}

export async function getRankByRegNo(regNo) {
  const response = await fetch(`${BASE_URL}/api/marks/rank/${regNo}`);
  if (!response.ok) {
    throw new Error("Failed to fetch rank");
  }
  return await response.json();
}
