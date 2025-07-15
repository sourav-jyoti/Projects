import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


//*cors middleware
app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)


//*some express middlewares
app.use(express.json({limit:"16kb"})) //parse incoming Request Object as a JSON Object 
app.use(express.urlencoded({extended:true,limit:"16kb"})) //Built-in Express middleware to parse URL-encoded payloads.
app.use(express.static("public")) 

//cookie-parser middleware
app.use(cookieParser())

//import routes
import  healthcheckRouter  from "./routes/healthcheck.routes.js"


app.use("/api/v1/healthcheck",healthcheckRouter)

export {app}

