import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
     
     roles:{
        type: String,
        enum: ['user', 'guide'],
        default: 'guide'
     }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
