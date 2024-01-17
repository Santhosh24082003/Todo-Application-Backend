const express = require('express');
const routers = express.Router();
const { getGoals, postGoals,putGoals,deleteGoals } = require("../controller/goalsController");


routers.route("/").get( getGoals).post( postGoals);
routers.route("/:id").put( putGoals).delete(deleteGoals);


module.exports = routers;