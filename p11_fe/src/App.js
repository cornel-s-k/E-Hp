import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminView from './pages/AdminView';
import PembeliView from './pages/PembeliView';
import LoginAdmin from './pages/LoginAdmin';

function App() {
  return (
    <div>
      <h1>Website Penjualan HP</h1>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/admin" style={{ marginRight: 10 }}>Admin</Link>
        <Link to="/pembeli">Pembeli</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/pembeli" element={<PembeliView />} />
      </Routes>
    </div>
  );
}

export default App;
