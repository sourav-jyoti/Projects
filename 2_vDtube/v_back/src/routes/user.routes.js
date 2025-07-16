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


//**unsecured routes */

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

router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)


//*secured routes */

router.route("/logout").post(verifyJWT,  logoutUser) //first runs verifyjwt middleware then logoutUser controller
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
r
router.route("/c/:username").get(verifyJWT, getUserChannelProfile) //':' is used as we are extracting the username from url 

router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar) //uplaod.single as we are uploading 1 img
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/history").get(verifyJWT, getWatchHistory)



export default router

