const mongoose = require('mongoose');


const { Schema, model } = mongoose;



const todoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 500
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'In Progress'],
        default: 'Pending'
    }
}, { timestamps: true, versionKey: false });

const todoModel = model("todos", todoSchema);


module.exports = todoModel;