import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username === 'admin' && password === '1234') {
      navigate('/admin');
    } else {
      setError('Username atau password salah!');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '100px auto', padding: 20, background: '#fff', borderRadius: 8 }}>
      <h2>Login Admin</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleSubmit}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginAdmin;

