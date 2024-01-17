const mongoose = require("mongoose");

const goalsschema = mongoose.Schema({
    text:{
        type:String,
        required:[true],
    }
},{
    timestamps : true,
})

module.exports = mongoose.model('Goal',goalsschema )