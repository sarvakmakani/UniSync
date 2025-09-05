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

const getPolls = asyncHandler(async (req, res) => {
  const { idNo } = req.user;
  const year_dept = idNo.slice(0, -3);
  console.log(year_dept);

  let polls = await Poll.aggregate([
    {
      $match: {
        $and: [
          { deadline: { $gt: new Date() } },
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
      $project: {
        name: 1,
        deadline: 1,
        options: 1,
        _id: 1
      }
    }
  ]);

  // add alreadyVoted flag
  const pollsWithVoteStatus = await Promise.all(
    polls.map(async (poll) => {
      const voted = await PollResponse.findOne({
        pollId: poll._id,
        userId: req.user._id
      });

      return { 
        ...poll,                 // ✅ spread plain object
        alreadyVoted: !!voted    // true if user already voted
      };
    })
  );

  return res.json(
    new ApiResponse(200, pollsWithVoteStatus, "polls fetched successfully")
  );
});


const votePoll = asyncHandler(async(req,res)=>{
    const optionIdx=Number(req.body.option)
    const id=new mongoose.Types.ObjectId(req.params.id)
    const userId=new mongoose.Types.ObjectId(req.user._id)

    const poll=await Poll.findById(id)
    if(!poll) throw new ApiError(404,"poll not found")

    if(optionIdx>=poll.options.length || optionIdx<0) return ApiError(401,"invalid option index")

    const existingVote = await PollResponse.findOne({ pollId: id, userId:userId });
    if (existingVote) throw new ApiError(400, "User has already voted on this poll");

    const vote=await PollResponse.create({
        pollId:id,
        userId:userId,
        optionIdx:optionIdx
    })    
    if(!vote) throw new ApiError(500,"failed to vote")
    
    return res
    .json(
        new ApiResponse(200,vote,"voted successfully")
    )
})

export {
    getPolls,
    votePoll
}