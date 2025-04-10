import Citizens from "../models/User";
import {IUser} from "../interfaces/Users";

class Service {
  // Use IUserInput for plain input from controller
  async addUser(data: IUser) {
    return await Citizens.create(data);
  }


  async getUser() {
    return await Citizens.find();
  }

  // Check if user exists by email, phone
  async findUserByEmailPhone({ email, phone }: { email: string; phone: string }) {
    return await Citizens.findOne({
      $or: [{ email }, { phone }],
    });
  }

  async deleteUser(id: string) {
    return await Citizens.findByIdAndDelete(id)
}
}

const citizenService = new Service();
export default citizenService;
