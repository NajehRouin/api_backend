import User from "../model/userModel.js";
import CryptoJS from 'crypto-js'

//Controller for update User info
export const updateUser = async (req, res) => {
    const user = await User.findById(req.body._id);
    //if user exists
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password= req.body.password|| user.password;
        user.passion = req.body.passion || user.passion;
        user.niveau = req.body.niveau || user.niveau;
       

        const updatedUser = await user.save();

        res.send({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
             
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(401).send({ message: 'User not Found!' });
    }
}

//Controller for update Password
export const updatePassword = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate({ _id: req.body._id });
        !user && res.status(401).json('Wrong credentials!');

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.oldPassword && res.status(401).json('The old password is not correct!');

        if (req.body.newPassword === req.body.repeatNewPassword) {

            user.password = CryptoJS.AES.encrypt(req.body.newPassword, process.env.PASS_SEC).toString();
            await user.save();
            res.status(201).json("Password changed successfully!");

        } else {
            res.status(500).json("Passwords Don't Match!");
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

//Controller for delete Account or User
export const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
}

//Controller for update User image


//Controller for Get all User
export const getAllUsers = async(req, res) => {
    const users = await User.find();

    res.send(users);
}

//Controller for count Users
export const countUsers = async(req, res) => {
    try {
        const countAllUsers = await User.countDocuments();
        res.status(200).json({count: countAllUsers});
    } catch(error) {
        return res.status(500).json(error);
    }
}