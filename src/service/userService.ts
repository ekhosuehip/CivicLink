import User from "../models/User";
import IUser from "../interfaces/Users";

class Service {
  // Use IUserInput for plain input from controller
  async addUser(data: IUser) {
    return await User.create(data);
  }

  async getUserByCategory() {
    return await User.find({ category: 'official' });
  }

  async getUser() {
    return await User.find();
  }

  // Check if user exists by email, phone, or NIN
  async findUserByEmailPhonePosition({ email, phone, position }: { email: string; phone: string; position: string }) {
    return await User.findOne({
      $or: [{ email }, { phone }, { position }],
    });
  }
}

const userService = new Service();
export default userService;
