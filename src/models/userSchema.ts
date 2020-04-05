import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config/config';

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    permissions: [String],
    status: Boolean
}, { timestamps: true });

type UserDocument = mongoose.Document & {
    name: string;
    email: string;
    password: string;
    permissions: string[];
    status: boolean;
};

export type UserModelT = mongoose.Model<UserDocument>;

/**
 * Encrypt the password before saving
 */
userSchema.pre('save', async function (next: any) {
    const user = this as UserDocument;

    if (!user.isModified('password')) { return next(); }

    const salt = await bcrypt.genSalt(config.saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

export const UserModel: UserModelT = mongoose.model('User', userSchema);
