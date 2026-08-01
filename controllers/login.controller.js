const user=require('../model/signUp');
// to check stored password directly 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = "r@ishabh15";
exports.CheckUser = async (req, res) => {
    try { 
        const {email,Setpassword } = req.body;
        // 1. Find user by email
        const result =await user.findOne({email});
        if(!result){
            return res.status(401).json({success:false, message:"Invalid Credentials" });
        }

        // 2. Validate password
        const isPasswordValid=await bcrypt.compare(Setpassword,result.Setpassword);
        if (!isPasswordValid) {
            return res.status(401).json({success:false,message:"Invalid Credentials" });
        }
        // 3. Create clean payload
        const payload = {
            _id:result._id,
            email:result.email,
        };
        // 4. Generate JWT
        const token=jwt.sign(payload, JWT_SECRET);
        // 5. Send token back to user (in cookie or JSON)
        return res.status(200).json({success:true,token });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};