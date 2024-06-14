import mongoose  from "mongoose";

const database = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://jyoti:jyoti123@cluster0.6vyjog0.mongodb.net`,{
            dbName: process.env.DB_NAME,
        });
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default database;