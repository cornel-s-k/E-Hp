// const express = require('express'); 
// const router = express.Router(); 
// const db = require('../db');  

// // GET: Ambil semua produk 
// router.get('/', (req, res) => {   
//     db.query('SELECT * FROM produk', (err, results) => {     
//         if (err) return res.status(500).json(err);     
//         res.json(results);  
//     });
// });  

// // POST: Tambah produk baru 
// router.post('/', (req, res) => {   
//     const { nama, harga } = req.body;   
//     db.query('INSERT INTO produk (nama, harga) VALUES (?, ?)', [nama, harga], (err, result) => {     
//         if (err) return res.status(500).json(err);     
//         res.json({ id: result.insertId, nama, harga });  
//     });
// });

// // DELETE: Hapus produk berdasarkan ID
// router.delete('/:id', (req, res) => {   
//     db.query('DELETE FROM produk WHERE id = ?', [req.params.id], (err) => {     
//         if (err) return res.status(500).json(err);     
//         res.json({ message: 'Produk dihapus' });  
//     }); 
// });  

// module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET semua produk
router.get('/', (req, res) => {
  db.query('SELECT * FROM produk', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// POST tambah produk
router.post('/', (req, res) => {
  const { nama, harga, image_url } = req.body;
  db.query('INSERT INTO produk (nama, harga, image_url) VALUES (?, ?, ?)', 
    [nama, harga, image_url], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, message: 'Produk ditambahkan' });
  });
});

// DELETE produk
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM produk WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Produk dihapus' });
  });
});

module.exports = router;

