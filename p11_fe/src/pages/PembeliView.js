import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalBayar from '../components/ModalBayar';

const PembeliView = () => {
  const [produk, setProduk] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduk, setSelectedProduk] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchProduk = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/produk');
      setProduk(res.data);
    } catch (error) {
      console.error('Gagal mengambil data produk:', error);
    }
  };

  const handleOpenModal = (produk) => {
    setSelectedProduk(produk);
    setModalOpen(true);
  };

  const handleBayar = async (nama, jumlah) => {
    const tanggal = new Date().toISOString().split('T')[0];
    try {
      await axios.post('http://localhost:5000/api/pembelian', {
        nama,
        jumlah: parseInt(jumlah),
        produk_id: selectedProduk.id,
        tanggal
      });
      alert('Pembayaran berhasil!');
      setModalOpen(false);
    } catch (error) {
      console.error('Pembayaran gagal:', error);
      alert('Terjadi kesalahan saat pembayaran.');
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const filteredProduk = produk
    .filter(p =>
      p.nama.toLowerCase().startsWith(filter.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === 'asc'
        ? a.nama.localeCompare(b.nama)
        : b.nama.localeCompare(a.nama);
    });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProduk.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProduk.length / itemsPerPage);

  return (
    <div>
      <h2>View Pembeli</h2>

      <input
        placeholder="Filter nama produk"
        value={filter}
        onChange={e => {
          setFilter(e.target.value);
          setCurrentPage(1); // Reset halaman ke 1 saat filter berubah
        }}
        style={{ marginRight: '10px' }}
      />

      <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
      </select>

      <div className="card-container" style={{ marginTop: '20px' }}>
        {currentItems.map((item) => (
          <div className="card" key={item.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h4>{item.nama}</h4>
            <p>Rp {item.harga}</p>
            <button onClick={() => handleOpenModal(item)}>Bayar</button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: '0 5px',
              backgroundColor: currentPage === i + 1 ? '#007bff' : '#f0f0f0',
              color: currentPage === i + 1 ? '#fff' : '#000',
              border: 'none',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {modalOpen && (
        <ModalBayar
          produk={selectedProduk}
          onClose={() => setModalOpen(false)}
          onBayar={handleBayar}
        />
      )}
    </div>
  );
};

export default PembeliView;
