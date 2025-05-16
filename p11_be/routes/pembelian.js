
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST buat pembelian
router.post('/', (req, res) => {
  const { nama, jumlah, produk_id, tanggal } = req.body;
  if (!nama || !jumlah || !produk_id || !tanggal) {
    return res.status(400).json({ message: 'Lengkapi semua data!' });
  }

  db.query('INSERT INTO pembelian (nama, jumlah, produk_id, tanggal) VALUES (?, ?, ?, ?)',
    [nama, jumlah, produk_id, tanggal], (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Pembelian berhasil' });
    });
});

// GET semua pembelian (filter tanggal optional)
router.get('/', (req, res) => {
  const tanggal = req.query.tanggal;
  let query = 'SELECT pembelian.*, produk.nama AS nama_produk, produk.harga FROM pembelian JOIN produk ON produk.id = pembelian.produk_id';
  
  if (tanggal) {
    query += ` WHERE tanggal = '${tanggal}'`;
  }

  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

module.exports = router;
