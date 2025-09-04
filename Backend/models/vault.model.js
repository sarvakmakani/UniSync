import mongoose, { Schema } from "mongoose";

const voltSchema = new Schema(
  {
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    document:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

export const Volt = mongoose.model("Volt", voltSchema);
