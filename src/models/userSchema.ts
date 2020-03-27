import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    status: Boolean
}, { timestamps: true });

type UserDocument = mongoose.Document & {
    name: string;
    email: string;
    password: string;
    status: boolean;
};

export type UserModelT = mongoose.Model<UserDocument>;

/**
 * Encrypt the password before saving
 */
userSchema.pre('save', async function (next: any) {
    const user = this as UserDocument;

    if (!user.isModified('password')) { return next(); }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10));
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

export const UserModel: UserModelT = mongoose.model('User', userSchema);
