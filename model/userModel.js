import mongoose from "mongoose";

//Create table for User
const UserSchema = new mongoose.Schema({

    username: { type:String, trim: true, required: [true, 'username is required'],}, //only one username
    email: { type: String,trim: true, required: [true, 'email is required'],
        unique: 'Two users cannot share the same email ({VALUE})',
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    passion: { type: String, required: true },
    niveau: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
   
 

}, {
    timestamps: true //for date
});

const User = mongoose.model('User', UserSchema);


export default User;