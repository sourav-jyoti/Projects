//**purpose of this controller = healthcheck at constant time interval*/

import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler (async (req,res)=>{
    return res.status(200).json(new ApiResponse(200,"ok","Health check passed"))
})

export {healthcheck}

//*or using try catch , but we are not using try catch block because we have made a seperate asychandler 
/**
 
  const healthcheck = async (req,res) => {
     try{
        res.status(200).json
     }
     catch(error){
    }
 }
 */