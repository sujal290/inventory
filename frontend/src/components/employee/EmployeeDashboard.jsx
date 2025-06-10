import React, { useEffect, useState } from 'react';
import API from '../../services/api';

export default function EmployeeDashboard() {
  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);
  const [requestForm, setRequestForm] = useState({ item_type: '', justification: '' });
  const [disposalForm, setDisposalForm] = useState({ serial_no: '', reason: '' });

  useEffect(() => {
    API.get('/employee/dashboard').then(res => setUser(res.data));
    API.get('/employee/items').then(res => setItems(res.data));
  }, []);

  const handleItemRequest = () => {
    API.post('/employee/request-item', requestForm).then(() => alert("Request Sent"));
  };

  const handleDisposalRequest = () => {
    API.post('/employee/request-disposal', disposalForm).then(() => alert("Disposal Requested"));
  };

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <h2>Allotted Items:</h2>
      <ul>{items.map(i => <li key={i.serial_no}>{i.type} (x{i.quantity})</li>)}</ul>

      <h2>Request New Item</h2>
      <input placeholder="Item Type" onChange={e => setRequestForm({...requestForm, item_type: e.target.value})} />
      <input placeholder="Justification" onChange={e => setRequestForm({...requestForm, justification: e.target.value})} />
      <button onClick={handleItemRequest}>Request</button>

      <h2>Request Disposal</h2>
      <input placeholder="Serial No" onChange={e => setDisposalForm({...disposalForm, serial_no: e.target.value})} />
      <input placeholder="Reason" onChange={e => setDisposalForm({...disposalForm, reason: e.target.value})} />
      <button onClick={handleDisposalRequest}>Request Disposal</button>
    </div>
  );
}
