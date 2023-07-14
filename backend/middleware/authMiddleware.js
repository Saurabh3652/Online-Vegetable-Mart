import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req,res,next)=>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token  =req.headers.authorization.split(' ')[1]
            console.log(token)
            const decoded =jwt.verify(token,process.env.JWT_TOKEN)
            console.log(decoded)
            req.user = await User.findById(decoded.id).select('-password')
            console.log(req.user)
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized token failed')
        }
    }
    else if(!token){
        res.status(401)
        throw new Error ('Not authorized ,no Token')
    }
    // console.log(req.headers.authorization)
    
}) 

const farmer =(req,res,next) =>{
    if(req.user && req.user.isFarmer){
        next()
    }
    else{
        res.status(401)
        throw new Error('Not authorized as an Farmer')
    }
}

export {protect,farmer}