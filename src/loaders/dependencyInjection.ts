import { Container } from 'typedi';
import { UserModel } from '../models/userSchema';
import { PermissionModel } from '../models/PermissionSchema';

export default () => {
    // Store dependency
    Container.set('userModel', UserModel);
    Container.set('permissionModel', PermissionModel);
};
