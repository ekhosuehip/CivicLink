import Citizens from "../models/User";
import {IUser} from "../interfaces/Users";

class Service {
  // Use IUserInput for plain input from controller
  async addUser(data: IUser) {
    return await Citizens.create(data);
  }

  // Check if user exists by email, phone
  async findUserByEmailPhone({ email, phone }: { email: string; phone: string }) {
    return await Citizens.findOne({
      $or: [{ email }, { phone }],
    });
  }

  // Get citizen by name or email
  async getByNameOrEmail(query: {
  fullName?: string;
  email?: string;
  userId: string;
      }) {
          const filters: any[] = [];

          if (query.fullName) {
              filters.push({ fullName: { $regex: query.fullName, $options: "i" } });
          }

          if (query.email) {
              filters.push({ email: { $regex: query.email, $options: "i" } });
          }

          if (query.userId) {
              filters.push({ _id: { $ne: query.userId } });  // Exclude the user with the provided _id
          }

          if (filters.length === 0) {
              return []; 
          }

          return await Citizens.find({ $or: filters });
      }

  async deleteUser(id: string) {
    return await Citizens.findByIdAndDelete(id)
}
}

const citizenService = new Service();
export default citizenService;
