import { Types } from "mongoose";

declare global {
    namespace Express {
      interface Request {
        user?: IAuthPayload;
      }
    }
  }
  
  export interface IAuthPayload {
    userId: Types.ObjectId;

  }