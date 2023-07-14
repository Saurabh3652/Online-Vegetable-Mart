import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () =>{
    try{
        const conn  =await mongoose.connect(process.env.MONGO_URI)

        console.log(`Mongo Db Connected : ${conn.connection.host}`.cyan.underline)
    }
    catch(err){
        console.log(`${err.message}`.red.underline.bold);
        process.exit(1);
    }
}

export default connectDB