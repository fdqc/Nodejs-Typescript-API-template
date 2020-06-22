import mongoose from 'mongoose';

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
    permissions?: string[];
    status: boolean;
};

export type UserModelT = mongoose.Model<UserDocument>;

export const UserModel: UserModelT = mongoose.model('User', userSchema);
