const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmroutes');
const productRoutes = require('./routes/productRoutes');

dotEnv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected successfully!"))
.catch((error)=>console.log((error)))
 // Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);

// Fallback route for unmatched requests
app.use('/', (req, res) => {
    res.status(404).send("<h1>welcome YamCart</h1>");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});