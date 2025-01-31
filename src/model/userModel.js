const mongoose = require('mongoose');

const {Schema,model} = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        minlength: 8
    }
},{timestamps:true,versionKey:false});

const User = model('users', userSchema);
