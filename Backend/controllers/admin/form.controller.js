import mongoose from "mongoose";
import { Event } from "../../models/event.model.js";
import { Form } from "../../models/form.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { FormResponse } from "../../models/formResponse.model.js";

const addForm = asyncHandler(async(req,res)=>{
    const {name,description,deadline,for:forWhom}=req.body
    const userId=new mongoose.Types.ObjectId(req.user._id)
    if(!name || !description || !deadline) throw new ApiError(401,"provide all fields")
    if(!forWhom) forWhom="All"

    const form=await Form.create({
        name,
        description,
        deadline:new Date(deadline),
        userId,
        forWhom
    })
    if(!form) throw new ApiError(500,"Form creating failed")
    
    return res.json(
        new ApiResponse(201,form,"form added successfully")
    )
})

const updateForm = asyncHandler(async(req,res)=>{
    const {name,description,deadline,for:forWhom}=req.body
    const {id}=req.params

    let matchedStage={}
    if(name) matchedStage.name=name
    if(description) matchedStage.description=description
    if(deadline) matchedStage.deadline= new Date(deadline)
    if(forWhom) matchedStage.for=forWhom

    const form=await Form.findByIdAndUpdate(id,matchedStage,{new:true})
    if(!form) throw new ApiError(404,"Form not found")

    return res.json(
        new ApiResponse(200,form,"form updated successfully")
    )
})

const getForms = asyncHandler(async(req,res)=>{
    let pastForms = await Form.aggregate([
        {
            $match: { deadline: { $lt: new Date() } }
        },
        {
            $project: {
                uploadedBy: 0,
                for: 0,
                __v: 0,
            },
        },
    ]);

    let upcomingForms = await Form.aggregate([
        {
            $match: { deadline: { $gt: new Date() } }
        },
        {
            $project: {
                uploadedBy: 0,
                for: 0,
                __v: 0,
            },
        },
    ]);

    return res.json(
        new ApiResponse(200,{pastForms:pastForms,upcomingForms:upcomingForms},"form added successfully")
    )
})

const formStatus=asyncHandler(async(req,res)=>{
    const id=new mongoose.Types.ObjectId(req.params.id)
    let {limit=10,page=1}=req.body

    if(limit) limit=Number(limit)
    if(page) page=Number(page)
    const skip= (page-1)*limit

    const formResponse=await FormResponse.aggregate([
        {
            $match:{formId:id}
        },
        {$skip:skip},
        {$limit:limit},
        {
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"user",
                pipeline:[
                    {
                        $project:{
                            name:1,
                            email:1,
                            idNo:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {$unwind:"$user"},
        {
            $project:{
                _id:0,
                user:1,
                __v:0
            }
        }
    ])
    //gives students who filled the form
    return res.json(
        new ApiResponse(200,formResponse,"form status fetched successfully")
    )
})

export {
    addForm,
    updateForm,
    getForms,
    formStatus
}