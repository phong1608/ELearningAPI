import { Types } from "mongoose";
import Review from "../interfaces/review.interface";
import reviewModel from "../models/review.model";
import { publishDirectMessage } from "../queues/producer";
import { ReviewChannel } from "@review/server";
import Rating from "../interfaces/rating.interface";
class ReviewService{
    static async addReview(reviewer_id:Types.ObjectId,review:Review)
    {
        review.reviewer_id=reviewer_id
        const exchangeName ="review-exchange"
        const routingKey="new-review"
        const newReview = new reviewModel(review)
        const message = {user:newReview.reviewer_id,course_id:newReview.course_id,rating:newReview.rating} as Rating
        await publishDirectMessage(ReviewChannel,exchangeName,routingKey,JSON.stringify(message))
        
        return await newReview.save()
    }
    static async GetCourseReviews(course_id:Types.ObjectId)
    {
        return await reviewModel.findOne({course_id: course_id})
    }
}

export default ReviewService