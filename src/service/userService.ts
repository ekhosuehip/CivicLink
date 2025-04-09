import User from "../models/User";
import IUser from "../interfaces/Users";


class Service {
    // Add user
    async addUser (data: IUser) {
        return await User.create(data)
    }

}

const userService = new Service
export default userService