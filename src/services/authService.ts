import bcrypt from 'bcrypt';
import * as jwt from 'jwt-simple';
import { UserSchema } from '../models/userSchema';
import { AuthError } from '../middleware/errorHandlerMiddlewares';
import { UserRegisterI } from '../interfaces/user';

export class AuthService {

    /**
     * Authenticates the user and returns a token
     * @param email string
     * @param password string
     */
    public async authenticate(email: string, password: string) {
        const foundUserDoc = await UserSchema.findOne({ email: email });

        if (!foundUserDoc) { throw new AuthError('user_does_not_exist'); }
        const match = await bcrypt.compare(password, foundUserDoc.get('password'));

        if (!match) { throw new AuthError('invalid_password'); }
        const token = jwt.encode({ id: foundUserDoc.id }, process.env.JWT_SECRET);

        return token;
    }

    /**
     * Registers the user and returns a token
     * @param user UserRegisterI
     */
    public async register(user: UserRegisterI) {
        const createdUser = await UserSchema.create({
            name: user.name,
            email: user.email,
            password: user.password,
            status: true
        });

        const token = jwt.encode({ id: createdUser.id }, process.env.JWT_SECRET);

        return token;
    }
}
