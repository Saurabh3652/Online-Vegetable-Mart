import asyncHandler from "express-async-handler";
import generateToken from "../utils/genrateToken.js";
import User from '../models/userModel.js'

//validating email and password
//Auth User Post req to /api/users.login

const authUser = asyncHandler(async (req,res)=>{
     const{email,password} = req.body
     const user = await User.findOne({email: email})

     if(user && await user.matchPassword(password)){
        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isFarmer: user.isFarmer,
            token: generateToken(user._id),
        })
        console.log("in log")
        console.log(user)
     }
     else{
        res.status(401)
        throw new Error('Invalid email or password ')
     }
})

const registerUser = asyncHandler(async (req,res)=>{
    const{name,email,password,isFarmer} = req.body
    const userExist = await User.findOne({email})

   if(userExist){
    res.status(400)
    throw new Error('User already exists')
   }

   const user =await User.create ({
    name,
    email,
    password,
    isFarmer
   }) 

   if(user){
        res.status(201).json({
            _id: user._id,
            name:user.email,
            email:user.email,
            isFarmer: user.isFarmer,
            token: generateToken(user._id),
        })
   }
   else{
    res.status(400)
    throw new Error ('User Not Found ')
   }
})



const getUserProfile = asyncHandler(async (req,res)=>{
    console.log(req.user)
    const user=await User.findById(req.user._id)
    console.log(req.user._id)
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isFarmer:user.isFarmer
        })
    }
    else {
        res.status(404)
        throw new Error('User not Found')
    }
})

const updateUserProfile = asyncHandler(async (req,res)=>{
    const user=await User.findById(req.user._id)

    if(user){
        user.name=req.body.name || user.name
        user.email =req.body.email || user.email
        if(req.body.password){
            console.log(req.body.password)
            console.log(user.password)
            user.password=req.body.password
        }

        const updateduser =await user.save()
        res.json({
            _id:updateduser._id,
            name:updateduser.name,
            email:updateduser.email,
            isFarmer:updateduser.isFarmer,
            token:generateToken(updateduser._id)
        })
    }
    else {
        res.status(404)
        throw new Error('User not Found')
    }
})

const getUsers = asyncHandler(async (req,res)=>{
    // console.log(req.user)
    const users=await User.find({})
    // console.log(req.user._id)
    res.json(users)
})

const deleteUser = asyncHandler(async (req,res)=>{
    // console.log(req.user)
    const user =await User.findById(req.params.id)
    console.log("type of id")
    console.log(user)
    if(user){
        await User.findByIdAndRemove(req.params.id)
        res.json({message : "user removed"})
    }
    else{
        res.status(404)
        throw new Error('User Not found')
    }
})

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser
}