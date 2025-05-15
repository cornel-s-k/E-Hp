import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminView = () => {
  const [produk, setProduk] = useState([]);
  const [pembelian, setPembelian] = useState([]);
  const [namaProduk, setNamaProduk] = useState('');
  const [harga, setHarga] = useState('');
  const [filterTanggal, setFilterTanggal] = useState('');
  const [totalKotor, setTotalKotor] = useState(0);

  // Pagination states
  const [produkPage, setProdukPage] = useState(1);
  const [pembelianPage, setPembelianPage] = useState(1);
  const itemsPerPage = 5;

  const fetchProduk = async () => {
    const res = await axios.get('http://localhost:5000/api/produk');
    setProduk(res.data);
  };

  const fetchPembelian = async () => {
    const url = filterTanggal
      ? `http://localhost:5000/api/pembelian?tanggal=${filterTanggal}`
      : 'http://localhost:5000/api/pembelian';
    const res = await axios.get(url);
    setPembelian(res.data);

    let total = 0;
    res.data.forEach(p => {
      total += p.harga * p.jumlah;
    });
    setTotalKotor(total);
  };

  const handleTambahProduk = async () => {
    if (!namaProduk || !harga) return alert('Lengkapi data produk');
    await axios.post('http://localhost:5000/api/produk', {
      nama: namaProduk,
      harga: parseInt(harga)
    });
    setNamaProduk('');
    setHarga('');
    fetchProduk();
  };

  const handleHapus = async (id) => {
    if (window.confirm('Yakin hapus produk?')) {
      await axios.delete(`http://localhost:5000/api/produk/${id}`);
      fetchProduk();
    }
  };

  useEffect(() => {
    fetchProduk();
    fetchPembelian();
  }, [filterTanggal]);

  // Pagination helpers
  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const produkToShow = paginate(produk, produkPage);
  const pembelianToShow = paginate(pembelian, pembelianPage);

  return (
    <div>
      <h2>Admin View</h2>

      {/* Dashboard Ringkas */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Dashboard</h3>
        <p><strong>Total Produk:</strong> {produk.length}</p>
        <p><strong>Total Pembelian:</strong> {pembelian.length}</p>
        <p><strong>Total Pendapatan Kotor:</strong> Rp {totalKotor}</p>
      </div>

      {/* Tambah Produk */}
      <h3>Tambah Produk</h3>
      <input placeholder="Nama Produk" value={namaProduk} onChange={e => setNamaProduk(e.target.value)} />
      <input type="number" placeholder="Harga" value={harga} onChange={e => setHarga(e.target.value)} />
      <button onClick={handleTambahProduk}>Tambah</button>

      {/* Daftar Produk */}
      <h3>Daftar Produk</h3>
      <div className="card-container">
        {produkToShow.map((item) => (
          <div className="card" key={item.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h4>{item.nama}</h4>
            <p>Rp {item.harga}</p>
            <button onClick={() => handleHapus(item.id)}>Hapus</button>
          </div>
        ))}
      </div>
      {/* Pagination Produk */}
      <div>
        {Array.from({ length: totalPages(produk) }, (_, i) => (
          <button
            key={i}
            onClick={() => setProdukPage(i + 1)}
            style={{
              margin: '5px',
              backgroundColor: produkPage === i + 1 ? '#007bff' : '#eee',
              color: produkPage === i + 1 ? '#fff' : '#000'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <hr />

      {/* Data Pembelian */}
      <h3>Data Pembelian</h3>
      <select onChange={(e) => {
        setFilterTanggal(e.target.value);
        setPembelianPage(1);
      }}>
        <option value="">Semua</option>
        <option value={new Date().toISOString().split('T')[0]}>Hari Ini</option>
        <option value={getYesterday()}>Kemarin</option>
        <option value={getTomorrow()}>Besok</option>
      </select>

      <table border="1" cellPadding="5" style={{ marginTop: '10px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Produk</th>
            <th>Jumlah</th>
            <th>Harga</th>
            <th>Total</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {pembelianToShow.map((p, index) => (
            <tr key={index}>
              <td>{p.nama}</td>
              <td>{p.nama_produk}</td>
              <td>{p.jumlah}</td>
              <td>{p.harga}</td>
              <td>{p.jumlah * p.harga}</td>
              <td>{p.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Pembelian */}
      <div>
        {Array.from({ length: totalPages(pembelian) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPembelianPage(i + 1)}
            style={{
              margin: '5px',
              backgroundColor: pembelianPage === i + 1 ? '#007bff' : '#eee',
              color: pembelianPage === i + 1 ? '#fff' : '#000'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export default AdminView;
