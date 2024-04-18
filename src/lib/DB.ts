import mongoose from "mongoose";


const connection: any = {};

export const connectToDB = async () => {
    try {

        if (connection.isConnected) {
            return;
        }

        const db = await mongoose.connect(process.env.DB_URL as string)
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to DB");
        
    } catch (error:any) {
        throw new Error(error);
    }
}