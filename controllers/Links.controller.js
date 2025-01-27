import { Links } from "../models/LinkUpload.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";


export const getLinks=async(req,res)=>{
    try{
        const {type}=req.query;
        console.log(type)
        const data=await Links.find({typeOfMaterial:type});
        return res.status(200).json(
            new ApiResponse(200,data,`Links Data for ${type} found Successfully`)
        )
    }
    catch(error){
        throw new ApiError(404,"data not found while fetching the links"+error)
    }
}

const postLinks = async (req, res) => {
    try {
        const { link, typeOfMaterial, Class, subject, chapter,secretCode } = req.body;

        if (secretCode!=process.env.SECRET_CODE) {
            const apiError = new ApiError(
                400,
                "Invalid secret code! Please ensure you have the correct access credentials. If you're not an admin, you should not access this page.",
                [{ field: "required", message: "All fields are required. Please fill out all the necessary information." }]
              );
            return res.status(apiError.statusCode).json(apiError);
        }

        if (!link || !typeOfMaterial || !Class || !subject || !chapter) {
            const apiError = new ApiError(
                400,
                "Insufficient data or missing field",
                [{ field: "required", message: "All fields are mandatory." }]
            );
            return res.status(apiError.statusCode).json(apiError);
        }
        
        console.table(req.body);

        // Create and save the new link
        const newLink = await Links.create({ link, typeOfMaterial, Class, subject, chapter });

        return res.status(201).json(
            new ApiResponse(201, newLink, "Links Data has been entered in our systems")
        );
    } catch (error) {
        return res.status(404).json(
            new ApiError(404, "There is an issue in entering data in the system: " + error.message)
        );
    }
};
export {postLinks}