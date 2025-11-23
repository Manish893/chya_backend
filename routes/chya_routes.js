const express = require('express');
const route = express.Router();
const multer = require('multer');
const chyaController = require('../contollers/chya_controller');


const storage = multer.diskStorage({
    //save in this location
    destination:(req,file,cb) => cb(null,'uploads/'),
    //save in datatime.png
    filename:(req,file,cb) => cb(null,Date.now() + '-' + file.originalname)
});
const upload = multer({storage});

//chyalist/addchya
route.post('/addchya',upload.single('image'),chyaController.addChyaItem);
//chyalist/updatechya/
route.put('/updatechya/:id',upload.single('image'),chyaController.updateChyaItem);

route.get('/items', chyaController.getChyaList);
module.exports = route;