import mongoose,{model,Schema} from "mongoose";

mongoose.connect("mongodb://localhost:27017/brainly")

//creating schema

const UserSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        }
        
    }
)

const ContentSchema = new Schema(
    {
        //every user has there own content
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        link:{
            type:String,
            required:true,
        },      
        title:{
            type:String,
            required:true,
        },
        tags:[{
            type:Schema.Types.ObjectId,
            ref:"Tag"
        }]
        //square bracket tells it is an array
    }
)


const TagSchema = new Schema(
    {
        title:{
            type:String
        }
    }
)


const LinkSchema = new Schema(
    {
        
    }
)


//creating model

export const UserModel = model("User",UserSchema);
export const ContentModel = model("Content",ContentSchema);
export const TagModel = model("Tag",TagSchema);
export const LinkModel = model("Link",LinkSchema);



//==nect update 
/**
 **make the db connection inside try catch
 **use TS genirics to achieve true Ts in db.ts
 */


