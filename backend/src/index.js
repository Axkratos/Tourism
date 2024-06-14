import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import database from './db/database.js'
dotenv.config()

import userRoutes from './routes/userRoutes.js'


const app = express()

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

//using the cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
database();



app.use("/api/user",userRoutes);

const PORT = 3000;

app.listen(PORT,()=>{
 console.log(`server is running in the port ${PORT}`);
})

export {app};