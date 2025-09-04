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

const getEvents = asyncHandler(async(req,res)=>{
    const {idNo} =req.user
    const year_dept = idNo.trim(0,-3)
    let events=await Event.aggregate([
        {
            $match:{
                $and: [
                    { date: { $gt: new Date() } }, 
                    {
                        $or: [
                            { for: year_dept }, 
                            { for: "All" }      
                        ]
                    }
                ]
            }
        },
        {
            $project:{
                uploadedBy:0,
                for:0,
                __v:0,
                _id:0
            }
        }
    ])
    
    return res
    .json(
        new ApiResponse(200,events,"events fetched successfully")
    )   
})

export {
    getEvents
}