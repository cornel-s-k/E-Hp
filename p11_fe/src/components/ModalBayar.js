import React, { useState } from 'react';

const ModalBayar = ({ produk, onClose, onBayar }) => {
  const [nama, setNama] = useState('');
  const [jumlah, setJumlah] = useState('');

  const handleSubmit = () => {
    if (!nama || !jumlah) {
      alert('Lengkapi semua data!');
      return;
    }
    onBayar(nama, jumlah);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Pembayaran untuk: {produk.nama}</h3>
        <p>Harga: Rp {produk.harga}</p>
        <input type="text" placeholder="Nama Anda" value={nama} onChange={(e) => setNama(e.target.value)} />
        <input type="number" placeholder="Jumlah" value={jumlah} onChange={(e) => setJumlah(e.target.value)} />
        <div style={{ marginTop: 10 }}>
          <button onClick={handleSubmit}>Bayar</button>
          <button onClick={onClose} style={{ background: '#aaa', marginLeft: 10 }}>Batal</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    background: 'white', padding: 20, borderRadius: 8, width: 300,
    boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
  }
};

export default ModalBayar;
