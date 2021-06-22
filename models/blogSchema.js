const mongoose = require("mongoose");



const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required : true
    },
    CreatedAt:{
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Blog",blogSchema);