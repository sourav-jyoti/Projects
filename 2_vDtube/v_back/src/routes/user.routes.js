import { Router } from "express";
import {  
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken
} from "../controllers/user.controllers.js";


import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxcount:1
        },{
            name:"coverImage",
            maxcount:1
        }
    ]),
    registerUser
) 


//secured routes
router.route("/logout").post(verifyJWT,  logoutUser) //first runs verifyjwt middleware then logoutUser controller

export default router

