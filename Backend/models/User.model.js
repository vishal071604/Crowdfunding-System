import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { //name of the user
        type: String,
        required: true
    },
    email: { //email of the user
        type:String,
        required:true,
        unique:true
    },
    password: { //password of the user
        type:String,
        required:true
    },
    role: { //role of the user, either 'user' or 'admin'
        type:String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isBlocked: { //whether the user is blocked or not
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;