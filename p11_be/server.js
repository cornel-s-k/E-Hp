// const express = require('express'); 
// const cors = require('cors'); 
// const bodyParser = require('body-parser');  
// const app = express(); 
// app.use(cors()); 
// app.use(bodyParser.json());  
// const produkRoutes = require('./routes/produk'); 
// app.use('/api/produk', produkRoutes);  
// const pembayaranRoutes = require('./routes/pembayaran'); 
// app.use('/api/bayar', pembayaranRoutes);   
// app.listen(5000, 'localhost', () => {   
//     console.log('Server berjalan di http://localhost:5000');
//  }); 

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
