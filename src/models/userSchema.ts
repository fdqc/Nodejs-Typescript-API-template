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

export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
    status: boolean;
};

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

export const UserSchema = mongoose.model('User', userSchema);
