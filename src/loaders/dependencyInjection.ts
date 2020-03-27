import { Container } from 'typedi';
import { UserModel } from '../models/userSchema';

export default () => {
    // Store dependency
    Container.set('userModel', UserModel);
};
