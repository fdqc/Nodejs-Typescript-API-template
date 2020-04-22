import { Container } from 'typedi';
import { UserModel } from '../models/userSchema';
import { PermissionModel } from '../models/PermissionSchema';
import Agenda from 'agenda';

export default (agenda: Agenda) => {
    // Set dependencies
    Container.set('userModel', UserModel);
    Container.set('permissionModel', PermissionModel);
    Container.set('agendaInstance', agenda);
};
