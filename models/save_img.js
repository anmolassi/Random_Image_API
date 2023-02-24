//building schema
const mongoose=require('mongoose');
const saveImgSchema = new mongoose.Schema({
    author:{
        type: String,
        required:true
    },
    linkedIn:{
        type:String,
        required:true
    },
    originalName:{
        type:String,
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    bytes:{
        type:String,
        required:true
    },
});
const saveImg = mongoose.model('saveImg',saveImgSchema);

module.exports=saveImg;