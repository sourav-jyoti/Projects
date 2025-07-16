//**purpose of this controller = user registration process */

import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCLoudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req,res)=>{

 const {fullName, email, username, password } = req.body

 
//*validation
 
//--if any filled any is empty after trim then throw error
//.some() is a calback takes every index in the array and perform the logic 
 if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
    throw new ApiError(400)
    }

//--check is usr is already present or not
const existedUser = await User.findOne({
    $or: [{ username }, { email }] //$or tells if any field present than error
})

if (existedUser) {
    throw new ApiError(409, "User with email or username already exists")
}

//*handling images
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

 if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

const avatar = await uploadOnCLoudinary(avatarLocalPath)
let coverImage =""

if(coverImageLocalPath){

    coverImage = await uploadOnCLoudinary(coverImageLocalPath)
}


//--create and save the user

const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email, 
    password,
    username: username.toLowerCase()
})


//--after user creation and check if user is created 
const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //createdUser has all the fields (as response ) except password and refreshTokwn
)


if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
)

})





export {
    registerUser
}