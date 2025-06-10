// // src/pages/Login.js
// import React, { useState } from "react";
// import api from "../api/axios";

// function Login() {
//   const [empId, setEmpId] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/login", {
//         empId,
//         password,
//       });
//       console.log("Login success:", res.data);
//       // Save token / user info
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input value={empId} onChange={(e) => setEmpId(e.target.value)} placeholder="Employee ID" />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;




import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ employee_id: '', password: '', role: 'employee' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/login", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", form.role);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Employee ID" onChange={(e) => setForm({ ...form, employee_id: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="employee">Employee</option>
        <option value="inventory_holder">Inventory Holder</option>
        <option value="group_ad">Group AD</option>
      </select>
      <button type="submit">Login</button>
    </form>
  );
}
