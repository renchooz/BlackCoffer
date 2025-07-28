import mongoose from "mongoose";
import 'dotenv/config'
const ConnectDb = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/blackcoffer`)
        console.log('Database Connected')
    } catch (error) {
        console.log("error in connecting db" + error)
    }
}
export default ConnectDb