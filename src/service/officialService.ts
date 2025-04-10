import Official from "../models/Official";
import { IOfficial } from "../interfaces/Oficial";


class OfficialService {
    // Add official
    async addOfficial (data: IOfficial) {
        return await Official.create(data)
    }

    // Check if official exists by email, phone
    async findUserByEmailPhone({ email, phone }: { email: string; phone: string }) {
        return await Official.findOne({
        $or: [{ email }, { phone }],
        });
    }
}

const officialService = new OfficialService();
export default officialService