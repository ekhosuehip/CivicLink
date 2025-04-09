import { Document} from "mongoose";

interface IUser extends Document {
    fullName: string;
    email: string;
    phone: string;
    nin: string;
  }

export default IUser
