const user=require('../model/signUp');

// to not store pass directly 
const bcrypt = require('bcryptjs');

exports.generateUser =async (req,res)=>{
    try{ 
        const body=req.body;
        const hashedPassword=await bcrypt.hash(body.Setpassword, 10);
        const result=await user.create({
        Username:body.Username,
        email:body.email,
        Setpassword:hashedPassword,
        });
        return res.status(201).json(result);
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}