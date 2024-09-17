import userModel from "../models/user.model";

import bcrypt from "bcrypt"
import findByEmail from "./user.service";
import Login from "../types/login.type";
import Register from "../types/register.type";
import createTokenPair  from "../utils/authUtils";
const role={
    LEARNER:"LEARNER",
    INSTRUCTOR:"INSTRUCTOR"
}



class AuthService{
    static signIn = async({email,password}:Login)=>
    {
        const user = await findByEmail({email})
        if(!user)
            return {message:"Email is not registed"}
        const match = bcrypt.compare(password,user.password)
        if(!match)
            return {message:"Password is incorrect"}
        const userId=user._id
        const tokens= await createTokenPair(userId.toString())
        
        return{
            userId,
            tokens
        }
    }
    
    static register = async({firstName,lastName,email,password,user_type}:Register)=>{
        const user = await userModel.findOne({email}).lean()
        if(user)
            return {message:"Email already registered"}
        const passwordHash = await bcrypt.hash(password,10)
        const register = new userModel({firstName:firstName,lastName:lastName,email:email,password:passwordHash,user_type:user_type})
        const newUser = await userModel.create(register)
        if(newUser)
        {
            
            const id:string = newUser.id
            

            const accessToken = await createTokenPair(newUser.id)
            return {
                code:201,
                metadata:{
                    user:newUser,
                    token:accessToken
                }
            }
        }
    }
}


export default AuthService