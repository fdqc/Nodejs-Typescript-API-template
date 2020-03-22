import { UserSchema } from '../models/userSchema';

export class UserService {

    /**
     * Gets all users
     */
    public async usersList() {
        const foundUserDoc = await UserSchema.find()
            .select('name email status');

        return foundUserDoc;
    }

    /**
     * Gets a user by its id
     * @param userId string
     */
    public async getUser(userId: string) {
        const foundUserDoc = await UserSchema.findById(userId)
            .select('name email status');

        return foundUserDoc;
    }
}
