import User from "../model/userModel.js"
import CryptoJS from "crypto-js"
import jwt from 'jsonwebtoken'



//Controller for Register User
export const registerUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(), //for hashed pass
        passion: req.body.passion,
        niveau: req.body. niveau,
    });
    try {
       
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(error) {
        res.status(500).json(error.message);
    }
}

//Controller for Login User
export const loginUser = async (req, res) => {
    try {

        const user = await User.findOne({email: req.body.email});
        
        if(!user) return res.status(401).json({msg:'user not found!'})  
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(originalPassword !== req.body.password) return  res.status(401).json('Wrong credentials!');

        const accessToken = jwt.sign({
            _id: user._id,
            isAdmin: user.isAdmin,
        }, 
            process.env.JWT_SEC,
            {expiresIn: '3d'}
        );

        const {password, ...others} = user._doc;
        res.status(200).json({...others, accessToken});


    } catch (error) {
        res.status(500).json(error.message);
    }
}