import { asyncHandler } from "../../utils/asyncHandler.js";

import {Cie} from "../../models/cie.model.js"
import {Event} from "../../models/event.model.js"
import {Form} from "../../models/form.model.js"
import {FormResponse} from "../../models/formResponse.model.js"
import {Poll} from "../../models/poll.model.js"
import {PollResponse} from "../../models/pollResponse.model.js"
import {User} from "../../models/user.model.js"
import {Vault} from "../../models/vault.model.js"
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import mongoose from "mongoose";
import {uploadOnCloudinary} from "../../utils/cloudinary.js"


const getDocuments = asyncHandler(async(req,res)=>{
    const userId=new mongoose.Types.ObjectId(req.user._id)
    const documents=await Vault.aggregate([
        {
            $match:{uploadedBy:userId}
        },
        {
            $project:{
                _id:1,
                document:1,
                name:1
            }
        }
    ])
    return res
    .json(
        new ApiResponse(200,documents,"documents fetched successfully")
    )
})

const addDocument = asyncHandler(async(req,res)=>{
    const userId=new mongoose.Types.ObjectId(req.user._id)
    const {name}=req.body

    if(!req.file) return ApiError(401,"document not uploaded")
    const fileUrl=req.file.buffer
    const document=await uploadOnCloudinary(fileUrl)
    if (!document) throw new ApiError(400, "document uplodation failed")
    
    console.log(document);
    

    const addedDocument=await Vault.create({
        uploadedBy:userId,
        document:document.secure_url,
        name:name
    })
    return res
    .json(
        new ApiResponse(201,addedDocument,"document added successfully")
    )
})

const deleteDocument = asyncHandler(async(req,res)=>{
    const documentId=new mongoose.Types.ObjectId(req.params.id)
    const document=await Vault.findByIdAndDelete(documentId)
    if(!document) return ApiError(500,"document deletion failed")
    return res
    .json(
        new ApiResponse(201,{},"document deleted successfully")
    )
})


export {
    getDocuments,
    addDocument,
    deleteDocument
}