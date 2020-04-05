import { Service, Inject } from 'typedi';
import { UserModelT } from '../models/userSchema';
import { AuthError } from '../middleware/errorHandlerMiddlewares';

@Service()
export class UserPermissionService {
    constructor(@Inject('userModel') private userModel: UserModelT) { }

    /**
     * Update user's permissions
     * @param userId string
     * @param permissions string[]
     */
    public async update(userId: string, permissions: string[]) {
        const updatedUser = await this.userModel.findByIdAndUpdate(
            userId,
            { permissions: permissions }
        );

        if (!updatedUser) { throw new AuthError('user_does_not_exist'); }

        return true;
    }
}
