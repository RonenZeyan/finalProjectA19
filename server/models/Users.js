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
        default: './images/iconMan.png', // נתיב לתמונת ברירת המחדל
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
