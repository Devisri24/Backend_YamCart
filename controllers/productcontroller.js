const Product = require('../models/Product');
const multer = require('multer');
const Firm = require('../models/Firm');
// const path = require('path');
// const mongoose = require('mongoose');  // for ObjectId validation

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const firmId = req.params.firmId;

//     // Check if firmId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(firmId)) {
//       return res.status(400).json({ error: 'Invalid firm ID' });
//     }

    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(401).json({ error: 'Firm not found' });
    }
    const product = new Product({
      productName,
      price,
      category,
      image,
      bestSeller,
      description,
      firm: firm._id
    });

    const savedProduct = await product.save();
    firm.products.push(savedProduct);
    await firm.save();
    return res.status(200).json({ savedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductByFirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;

//     // Check if firmId is valid
//     if (!mongoose.Types.ObjectId.isValid(firmId)) {
//       return res.status(400).json({ error: 'Invalid firm ID' });
//     }

    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ error: 'Firm not found' });
    }

    const restName = firm.firmName;
    const products = await Product.find({ firm: firmId });

    res.status(200).json({restName,products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Check if productId is valid
    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return res.status(400).json({ error: 'Invalid product ID' });
    // }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'No product found' });
    }

    return res.status(200).json({ message: 'Product found and deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById };
