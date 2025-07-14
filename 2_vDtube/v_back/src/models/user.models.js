
/**
  id string pk
  username string
  email string
  fullName string
  avatar string
  coverImage string
  watchHistory ObjectId[] videos
  password string
  refreshToken string
  createdAt Date
  updatedAt Date
*/

import mongoose,{Schema} from "mongoose";

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullname:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //cloudinary url
            required:true
        },
        coverImage:{
            type:String, //cloudinary url
            required:true
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video" //tells whose object id here video.model.js
            }
        ],//squarw bracket tells it is an array
        password:{
            type:String,
            required:[true,"password is reqd."]
        },
        refreshToken:{
            type:string
        },
    },
    {timestamps:true}//automatically creates updatedAt and createdAt
)

export const User = mongoose.model("User",userSchema)