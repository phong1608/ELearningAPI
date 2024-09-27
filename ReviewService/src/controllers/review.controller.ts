import ReviewService from "../services/review.service";
import {Request,Response} from "express"



class ReviewController{
    addReview = async(req:Request, res:Response)=>{
        if(!req.user)
        {
            throw new Error("You must login")
        }
        return res.status(201).json({
            message:"Your review has been added",
            metadata:await ReviewService.addReview(req.user.userId,req.body)
        })
    }
}
export default new ReviewController()