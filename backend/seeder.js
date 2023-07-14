import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import veg from './data/veg.js'
import User from './models/userModel.js'
import Veg from './models/vegModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData= async ()=>{
    try {
        await Order.deleteMany()
        await Veg.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const farmerUser = createdUsers[0]._id

        const sampleVeg = veg.map(it =>{
            return {...it,user:farmerUser}
        })

        await Veg.insertMany(sampleVeg)

        console.log('Data imported'.green.inverse)

    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}

const destroyData= async ()=>{
    try {
        await Order.deleteMany()
        await Veg.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed'.red.inverse)
        process.exit()
    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2]==='-d'){
    destroyData()
}
else{
    importData()
}