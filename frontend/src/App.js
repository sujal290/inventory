import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:3000/api';

const Login = () => {
  const [employee_id, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/login`, { employee_id, password, role });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', role);
      navigate(`/${role}/dashboard`);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="container">
        <div className="login-box">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Employee ID"
            onChange={e => setEmployeeId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <select onChange={e => setRole(e.target.value)} value={role}>
            <option value="employee">Employee</option>
            <option value="inventory_holder">Inventory Holder</option>
            <option value="group_ad">Group AD</option>
          </select>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

const Dashboard = ({ role }) => {
  const [details, setDetails] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API}/${role}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setDetails(res.data))
      .catch(() => alert('Failed to fetch dashboard'));
  }, [role, token]);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2>{role.replace('_', ' ').toUpperCase()} Dashboard</h2>
      <pre>{JSON.stringify(details, null, 2)}</pre>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/employee/dashboard" element={<Dashboard role="employee" />} />
      <Route path="/inventory_holder/dashboard" element={<Dashboard role="inventory_holder" />} />
      <Route path="/group_ad/dashboard" element={<Dashboard role="group_ad" />} />
    </Routes>
  </Router>
);

export default App;
