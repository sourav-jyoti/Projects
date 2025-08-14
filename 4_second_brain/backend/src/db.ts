import mongoose,{model,Schema} from "mongoose";

(async () => {
    try{
        const connectionInstance = await mongoose.connect("mongodb://localhost:27017/brainly")
       console.log(`\n Mongo connect ${connectionInstance.connection.host}`);
        
    }catch(e){
        console.log("mongodb connection error",e);
        process.exit(1);  
    }
})();

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

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed //its an enum

const ContentSchema = new Schema(
    {
        //every user has there own content
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        type: { type: String, enum: contentTypes, required: true },
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
            type:String,
            unique:true
        }
    }
)


const LinkSchema = new Schema(
    {
        
    }
)


//creating and exporting models 

export const UserModel = model("User",UserSchema);
export const ContentModel = model("Content",ContentSchema);
export const TagModel = model("Tag",TagSchema);
export const LinkModel = model("Link",LinkSchema);



//==next update 
/**
 *make the db connection inside try catch - done
 *use TS genirics to achieve true Ts in db.ts
 */