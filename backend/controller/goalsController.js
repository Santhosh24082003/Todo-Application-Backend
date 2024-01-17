const asyncHandler = require("express-async-handler");

const getGoals = asyncHandler(async (req,res)=>{
    res.status(200).json({message:'success'});
})

const postGoals = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(404)
        throw new Error("The page is not found")
    }
    else{ res.status(200).json({message:`The goal is created`})
}
})

const putGoals = asyncHandler(async (req,res)=>{
    res.status(200).json({message:`update goals ${req.params.id}`});
})


const deleteGoals = asyncHandler(async (req,res)=>{
    res.status(200).json({message:`delete goals ${req.params.id}`});
}) 

module.exports = {
    getGoals,
    postGoals,
    putGoals,
    deleteGoals,
}