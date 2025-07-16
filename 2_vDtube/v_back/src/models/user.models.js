
/**
  id string pk
  username string
  email string
  fullname string
  avatar string
  coverImage string
  watchHistory ObjectId[] videos
  password string
  refreshToken string
  createdAt Date
  updatedAt Date
*/

import mongoose,{Schema} from "mongoose";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";


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
            type:String
        },
    },
    {timestamps:true}//automatically creates updatedAt and createdAt
)

//=="pre()" is a hook that tells before saving
userSchema.pre("save",async function (next) {

    if(!this.isModified("password")) return next(); //*if password is not modified than no need to bcrypt

    this.password = bcrypt.hash(this.password,10)

    next()
})

//==to check whether user password is same as stored
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

//==jwt using generateAccessToken , 
userSchema.methods.generateAccessToken = function (){
    //short lived access token
    return jwt.sign({
        _id:this._id,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {   expiresIn:process.env.TOKEN_EXPIRE_TIME   }
    );
}

//==jwt generateRefreshToken
userSchema.methods.generateRefreshToken = function (){
    //short lived access token
    return jwt.sign({
        _id:this._id,
    },
    process.env.Refresh_TOKEN_SECRET,
    {   expiresIn:process.env.Refresh_EXPIRE_TIME   }
    );
}

export const User = mongoose.model("User",userSchema)

