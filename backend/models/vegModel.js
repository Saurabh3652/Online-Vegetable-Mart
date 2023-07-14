import mongoose from 'mongoose'

const reviewSchema =mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        require:true
    },
    comment:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

const vegSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    farmer:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        require:true,
        default:0
    },
    numreviews:{
        type:Number,
        require:true,
        default:0
    },
    price:{
        type:Number,
        require:true,
        default:0
    },
    countInStock:{
        type:Number,
        require:true,
        default:0
    }

},{
    timestamps: true
})

const Veg = mongoose.model('Veg',vegSchema)

export default Veg