
const express = require('express');
const cors = require('cors');
const app = express();
const produkRoutes = require('./routes/produk');
const pembelianRoutes = require('./routes/pembelian');

app.use(cors());
app.use(express.json());

app.use('/api/produk', produkRoutes);
app.use('/api/pembelian', pembelianRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
