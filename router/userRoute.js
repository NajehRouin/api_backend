import express from 'express'
import { countUsers, getAllUsers, updatePassword, updateUser } from '../controller/userController.js';

const UserRoutes = express.Router();

//Get All Users
UserRoutes.get('/allUsers', getAllUsers);

//Update User Info
UserRoutes.put('/update', updateUser);

//Update User Password
UserRoutes.put('/updatePassword', updatePassword);

//Delete User Account


//Count All Users
UserRoutes.get('/countUsers', countUsers);


export default UserRoutes;