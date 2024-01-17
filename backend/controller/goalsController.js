const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalsModal");
const { error } = require("console");

const getGoals = asyncHandler(async (req,res)=>{
    const goals  = await Goal.find() 
    res.status(200).json(goals);
})

const postGoals = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(404)
        throw new Error("The page is not found")
    }
     const goal = await Goal.create({
        text:req.body.text
     });

     res.status(200).json(goal)

})

const putGoals = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error('goal not found');
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json({message:`update goals ${updatedGoal}`});
})


const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await  Goal.findByIdAndDelete(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error('goal not found');
    }
    res.status(200).json(`id:${req.params.id}`)
});


module.exports = {
    getGoals,
    postGoals,
    putGoals,
    deleteGoals,
}