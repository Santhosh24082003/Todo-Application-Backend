const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userSchema = require("../models/userModal");

const protect = asyncHandler(async(req,res,next)=>{
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try{
            //get token from the header 
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decode = jwt.verify(token,process.env.JWT_SECRET)

            //Get the user by id
            req.user = await userSchema.findById(decode.id).select('-password') 

            next()
        }
        catch(error){
            console.log(error);
            res.status(401)
            throw new Error("Not authorizationed")
        }
    }
if(!token){
    res.status(401)
    throw new Error("Not authorizationed, No token")
}
})

module.exports = { protect }