import { Service, Inject } from 'typedi';
import { UserModelT } from '../models/userSchema';

@Service()
export class UserService {
    constructor(@Inject('userModel') private userModel: UserModelT) { }

    /**
     * Gets all users
     */
    public async usersList(page: string, page_size: string) {
        const limit = parseInt(page_size, 10);
        const skip = parseInt(page, 10) * limit;

        const totalResults = await this.userModel.countDocuments();
        const foundUsersDocs = await this.userModel.find()
            .select('name email status')
            .skip(skip)
            .limit(limit);

        return { totalResults, users: foundUsersDocs };
    }

    /**
     * Gets a user by its id
     * @param userId string
     */
    public async getUser(userId: string) {
        const foundUserDoc = await this.userModel.findById(userId)
            .select('name email status');

        return foundUserDoc;
    }
}
