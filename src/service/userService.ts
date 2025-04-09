import User from "../models/User";
import { IUser, IUserInput } from "../interfaces/Users";

class Service {
  // Use IUserInput for plain input from controller
  async addUser(data: IUserInput) {
    return await User.create(data);
  }

  // Get user through ID
  async getUser(_id: string) {
    return await User.findById(_id);
  }

  // Check if user exists by email, phone, or NIN
  async findUserByEmailPhoneNin({ email, phone, nin }: { email: string; phone: string; nin: string }) {
    return await User.findOne({
      $or: [{ email }, { phone }, { nin }],
    });
  }
}

const userService = new Service();
export default userService;
