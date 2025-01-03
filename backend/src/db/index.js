import mongoose from "mongoose";

const DB_Name = 'test';

const connectDB = async()=>{
    console.log(process.env.MONGO_URI,DB_Name);
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`);
        console.log(`Connected to database : ${connectionInstance.connection.host}`);
    }catch(error){
        console.error('ERROR : ',error)
        process.exit(1);
    }
}

export default connectDB;