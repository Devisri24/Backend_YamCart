const express = require('express');
const productcontroller = require("../controllers/productcontroller");

const router = express.Router();
router.post('/add-product/:firmId',productcontroller.addProduct);
router.get('/:firmId/products',productcontroller.getProductByFirm);
router.get('/upload/:imageName',(req ,res)=>
{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__firname,'..','uploads',imageName));
})
router.delete('/:productId',productcontroller.deleteProductById);
module.exports = router;