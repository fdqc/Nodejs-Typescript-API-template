import { Service, Inject } from 'typedi';
import { PermissionModelT } from '../models/PermissionSchema';
import { PermissionI } from '../interfaces/permission';

@Service()
export class PermissionService {
    constructor(@Inject('permissionModel') private permissionModel: PermissionModelT) { }

    /**
     * Gets all permissions
     */
    public async permissionList() {
        const foundPermissionsDocs = await this.permissionModel.find();

        return foundPermissionsDocs;
    }

    /**
     * Stores a new permission
     * @param permission PermissionI
     */
    public async store(permission: PermissionI) {
        await this.permissionModel.create({
            description: permission.description,
            value: permission.value,
            sub_levels: permission.sub_levels
        });

        return;
    }
}
