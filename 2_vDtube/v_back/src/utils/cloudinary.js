import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


    // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCLoudinary = async (localFilePath) =>{
    try {

        if(!localFilePath) return null
        //upload the file on cloudinary
       const response = await cloudinary.uploader.upload(
        localFilePath,{
            resource_type:"auto"
            }
        )
        console.log("File uploaded on cloudinary.FIle src: ", response.url);
        //once the file is uploaded , we would like to delete it from our server
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath) //if anything goes wrong in uploading then also delete the file from local
        return null
    }
}
       
export {uploadOnCLoudinary}

