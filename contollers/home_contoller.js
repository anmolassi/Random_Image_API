const saveImg=require('../models/save_img');
module.exports.home = function (req, res) {
    return res.render('home');
};
module.exports.upload = function(req,res,next){
    var fileinfo=req.files;
    console.log(fileinfo);
    for(let i=0;i<req.files.length;i++){
        saveImg.create({
            author:'Anmol Assi',
            linkedIn:'https://www.linkedin.com/in/anmol-assi-b2b0b6208',
            originalName:fileinfo[i].originalname,
            fileName:fileinfo[i].filename,
            path:'http://localhost:5000/'+fileinfo[i].path,
            bytes:fileinfo[i].size,
        })
    }
    res.send(fileinfo);
}
module.exports.getImage=function(req,res){
    // Math.floor(Math.random() * (1500 - 13 + 1)) + 13
    const getImg=Math.floor(Math.random() * (7867 - 1 + 1)) + 1;
    saveImg.find({originalName:`(${getImg}).jpg`},function(err,image){
        if(!image.length){
            res.send({
                failure:1
            })
            return;
        }
        res.send(image);
    });
}