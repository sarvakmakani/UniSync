import mongoose from "mongoose";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { Cie } from "../../models/cie.model.js";

const addCie = asyncHandler(async(req,res)=>{
    const userId=new mongoose.Types.ObjectId(req.us._id)
    const {description,date,time,venue} = req.body
    let forWhom=req.body.for
    if(!description || !date || !time || !venue) throw new ApiError(401,"provide all fields")
    if(!forWhom) forWhom="All"

    const cie=await Cie.create({
        uploadedBy:userId,
        description:description,
        date:new Date(date),
        time:time,
        venue:venue,
        for:forWhom
    })
    if (!cie) throw new ApiError(500, "CIE addition failed");

    return res.json(
        new ApiResponse(201,cie,"cie added successfully")
    )
})

const updateCie = asyncHandler(async(req,res)=>{
    const {description,date,time,venue} = req.body
    const forWhom=req.body.for

    let matchedStage={}
    if(description) matchedStage.description=description
    if(date) matchedStage.date= new Date(date)
    if(time) matchedStage.time=time
    if(venue) matchedStage.venue=venue
    if(forWhom) matchedStage.for=forWhom

    const {id}=req.params
    const cie=await Cie.findByIdAndUpdate(id,matchedStage,{new:true})
    
    if (!cie) throw new ApiError(404, "CIE not found");

    return res.json(
        new ApiResponse(200,cie,"cie updated successfully")
    )
})

const getCies = asyncHandler(async(req,res)=>{
    const userId=new mongoose.Types.ObjectId(req.us._id)
    let myCies=await Cie.aggregate([
        {
            $match:{ uploadedBy:userId }
        },
        {
            $lookup:{
                from:'users',
                localField:'uploadedBy',
                foreignField:'_id',
                as:'uploadedBy',
                pipeline:[{
                    $project:{
                        name:1,
                        email:1,
                        avatar:1,
                        _id:0
                    }
                }]
            }
        },
        {
            $project:{
                for:0,
                __v:0,
                _id:0,
                createdAt:0,
                updatedAt:0
            }
        }
    ])

    let pastCies=await Cie.aggregate([
        {
            $match:{ date: { $lt: new Date() } }
        },
        {
            $lookup:{
                from:'users',
                localField:'uploadedBy',
                foreignField:'_id',
                as:'uploadedBy',
                pipeline:[{
                    $project:{
                        name:1,
                        email:1,
                        avatar:1,
                        _id:0
                    }
                }]
            }
        },
        {
            $project:{
                for:0,
                __v:0,
                _id:0,
                createdAt:0,
                updatedAt:0
            }
        }
    ])

    let upcomingCies=await Cie.aggregate([
        {
            $match:{ date: { $gt: new Date() } }
        },
        {
            $lookup:{
                from:'users',
                localField:'uploadedBy',
                foreignField:'_id',
                as:'uploadedBy',
                pipeline:[{
                    $project:{
                        name:1,
                        email:1,
                        avatar:1,
                        _id:0
                    }
                }]
            }
        },
        {
            $project:{
                for:0,
                __v:0,
                _id:0,
                createdAt:0,
                updatedAt:0
            }
        }
    ])

    return res.json(
        new ApiResponse(200,{myCies:myCies,pastCies:pastCies,upcomingCies:upcomingCies},"cies fetched successfully")
    )
})

export {
    addCie,
    updateCie,
    getCies
}
