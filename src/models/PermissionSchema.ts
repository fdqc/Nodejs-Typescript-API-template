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
    value: String,
    sub_levels: [{
        description: String,
        value: String
    }]
}, { timestamps: true });

export const PermissionModel = mongoose.model('Permission', permissionSchema);
