import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import AuthRoutes from './router/authRoute.js';
import UserRoutes from './router/userRoute.js';


const app = express();
app.use(cors());
app.use(express.json())


//Router
app.use('/api/auth', AuthRoutes);
app.use('/api/user', UserRoutes);



app.use((error,req,res,next)=>{
    res.status(500).json({error:"Error Server 500"})
})


//Connect with DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Succesfull Connected to DB!");
}).catch((error) => {
    console.log(error.message);
})

//Create Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at connected : http://localhost:${port}`);
});