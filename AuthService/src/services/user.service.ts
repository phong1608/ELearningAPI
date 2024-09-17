import userModel from "../models/user.model";

interface FindByEmailParams {
    email: string;
    select?: {
      email?: number;
      password?: number;
      name?: number;
      role?: number;
    };
  }
  
  const findByEmail = async ({ email, select = { email: 1, password: 1, name: 1, role: 1 } }: FindByEmailParams) => {
    return await userModel.findOne({ email }).select(select).lean();
  };

export default findByEmail