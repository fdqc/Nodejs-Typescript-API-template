import mongoose from 'mongoose';

/**
 * I.e:
 * description: 'Users permissions',
 * value: 'users:*',
 * sub_levels: [{
 *      description: 'Users - read',
 *      value: 'users:read'
 * }]
 */
const permissionSchema = new mongoose.Schema({
    description: String,
    value: {
        type: String,
        unique: true
    },
    sub_levels: [{
        description: String,
        value: String
    }]
}, { timestamps: true });

type SubLevel = {
    description: string;
    value: string;
};

type PermissionDocument = mongoose.Document & {
    description: string;
    value: string;
    sub_levels: SubLevel[];
};

export type PermissionModelT = mongoose.Model<PermissionDocument>;

export const PermissionModel: PermissionModelT = mongoose.model('Permission', permissionSchema);
