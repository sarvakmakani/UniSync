import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const isAdmin=asyncHandler(async(req,res,next)=>{
    const _id=new mongoose.Types.ObjectId(req.user._id)
    const user=await User.findById(_id)
    if(!user.isAdmin) throw new ApiError(403,"access denied,not an admin")
    next()
})

export default isAdmin