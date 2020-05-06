import { Service, Inject } from 'typedi';
import { PermissionModelT } from '../models/permissionSchema';
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

    /**
     * Update a permission
     * @param permissionId string
     * @param permission PermissionI
     */
    public async update(permissionId: string, permission: PermissionI) {
        const updatedPermissionDoc = await this.permissionModel.findByIdAndUpdate(
            permissionId,
            {
                description: permission.description,
                value: permission.value,
                sub_levels: permission.sub_levels
            });

        return updatedPermissionDoc ? true : false;
    }

    /**
     * Removes a permission
     * @param permissionId string
     */
    public async remove(permissionId: string) {
        const removedPermissionDoc = await this.permissionModel.findByIdAndDelete(permissionId);
        return removedPermissionDoc ? true : false;
    }
}
