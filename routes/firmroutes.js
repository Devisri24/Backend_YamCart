const express=require('express');
const firmcontroller=require('../controllers/firmcontroller');
const verifytoken=require('../middlewares/verifytoken');
const router=express.Router();

router.post('/add-firm',verifytoken,firmcontroller.addFirm);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
res.headersSent('Content-Type', 'image/jpeg'); 
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
});

router.delete('/:firmId',firmcontroller.deleteFirmById);
module.exports=router;
