import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/model';
import appconstansts from '../config/appconstants.json';

const userSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: appconstansts.ROLES.STUDENT
    },
    company: {
        type: String,
    },
    designation: {
        type: String,
    },
    profile: {  
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
    },
}, {
    timestamps: true,
});

userSchema.index({ email: 1 });

export default model('User', userSchema);