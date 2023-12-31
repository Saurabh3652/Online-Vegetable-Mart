import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import { notFound,errorHandler} from './middleware/errorMiddleware.js'
import vegRoutes from './routes/vegRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


dotenv.config()

connectDB()
const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Sever is running...')
})

app.use('/api/veg',vegRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)


app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`server runninng in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))