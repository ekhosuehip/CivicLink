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

    // Get all officials
    async getAllOfficials() {
        return await Official.find()
    }

    // Get officials by name, jurisdiction, or position
    async getByNameJurisdictionOrPosition(query: {
    fullName?: string;
    jurisdiction?: string;
    position?: string;
    userId: string;
        }) {
            const filters: any[] = [];

            if (query.fullName) {
                filters.push({ fullName: { $regex: query.fullName, $options: "i" } });
            }

            if (query.jurisdiction) {
                filters.push({ jurisdiction: { $regex: query.jurisdiction, $options: "i" } });
            }

            if (query.position) {
                filters.push({ position: { $regex: query.position, $options: "i" } });
            }

            if (query.userId) {
              filters.push({ _id: { $ne: query.userId } });  // Exclude the user with the provided _id
            }

            if (filters.length === 0) {
                return []; 
            }

            return await Official.find({ $or: filters });
        }

    async getWithoutAuth(query: {
    fullName?: string;
    jurisdiction?: string;
    position?: string;
        }) {
            const filters: any[] = [];

            if (query.fullName) {
                filters.push({ fullName: { $regex: query.fullName, $options: "i" } });
            }

            if (query.jurisdiction) {
                filters.push({ jurisdiction: { $regex: query.jurisdiction, $options: "i" } });
            }

            if (query.position) {
                filters.push({ position: { $regex: query.position, $options: "i" } });
            }

            if (filters.length === 0) {
                return []; 
            }

            return await Official.find({ $or: filters });
        }
}

const officialService = new OfficialService();
export default officialService