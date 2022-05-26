const mongoose = require("mongoose")

const boardsSchema = mongoose.Schema({
    num:{
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    userId : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: Number,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    time : {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Boards", boardsSchema);