const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const userSchema = require("../models/userModal");
const { use } = require("../routes/goalroutes");


const registerUser = asyncHandler(async (req, res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    
    const userexist = await userSchema.findOne({email})

    if(userexist){
        res.status(400);
        throw new Error("The user already exist");
    }

    //hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await userSchema.create({
        name,
        email,
        password:hashedPassword,
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email,password} = req.body
    
    const user = await userSchema.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id: user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
       res.status(400)
       throw new Error('Invalid password') 
    }
});

const getMe = asyncHandler(async (req, res) => {
    const {_id,name, email} = await userSchema.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name,
        email,
    })
});

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}
module.exports = {
    registerUser,
    loginUser,
    getMe,
};