const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    Username:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    Setpassword:{
        type: String,
        required: true,
    },
});
const user=mongoose.model("users",userSchema);
module.exports=user;