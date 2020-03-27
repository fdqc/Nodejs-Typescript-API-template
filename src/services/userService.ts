import { Service, Inject } from 'typedi';
import { UserModelT } from '../models/userSchema';

@Service()
export class UserService {
    constructor(@Inject('userModel') private userModel: UserModelT) { }

    /**
     * Gets all users
     */
    public async usersList() {
        const foundUserDoc = await this.userModel.find()
            .select('name email status');

        return foundUserDoc;
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
