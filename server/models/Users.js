const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
    },
    age: Number, 
    password: {
        type: String,
        required: true, 
    },
    image: {
        type: String,
        default: './images/iconMan.png', // the path of the default image (before user upload his own)
    }, 
    phone: String, 
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true, 
    },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
