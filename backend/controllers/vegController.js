import asyncHandler from "express-async-handler";
import Veg from '../models/vegModel.js'

const getVegies = asyncHandler(async (req,res)=>{
    const vegies = await Veg.find({})
    res.json(vegies)
})

const getVegById = asyncHandler(async (req,res)=>{
    const veg = await Veg.findById(req.params.id)
    if(veg){
        res.json(veg);
    }
    else{
        res.status(404)
        throw new Error('Veg not found')
    }
})

export {
    getVegById,getVegies
}
