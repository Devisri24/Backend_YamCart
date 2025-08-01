const express=require('express')
const productcontroller=require('../controllers/productcontroller');
const router=express.Router();

router.post('/add-product/:firmId',productcontroller.addProduct);
router.get('/:firmId/products',productcontroller.getProductByFirm);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('content-Type','image/jpeg');
    res.sendFile(Path2D.join(__dirname,'..','uploads',imageName))
});
router.delete('/:productId',productcontroller.deleteProductById);
module.exports=router;