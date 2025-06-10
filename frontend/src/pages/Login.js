// src/pages/Login.js
import React, { useState } from "react";
import api from "../api/axios";

function Login() {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", {
        empId,
        password,
      });
      console.log("Login success:", res.data);
      // Save token / user info
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={empId} onChange={(e) => setEmpId(e.target.value)} placeholder="Employee ID" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
