var multer=require('multer');
const express=require('express');
const router = express.Router();
const homeController=require('../contollers/home_contoller');
var storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+file.originalname)
    }
});
var upload=multer({ storage:storage});
router.get('/',homeController.home);
router.get('/getRandomImage',homeController.getImage);
router.post('/uploads',upload.array('myFiles',8000),homeController.upload);  
module.exports=router;