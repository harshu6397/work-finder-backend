import { Schema, model } from "mongoose";
import { IJob } from "../interfaces/model";

const jobSchema: Schema = new Schema<IJob>({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    jobLocation: {
        type: String,
    },
    description: {
        type: String,
    },
    salary: {
        min: {
            type: Number,
        },
        max: {
            type: Number,
        },
        currency: {
            type: String,
        },
    },
    type: {
        type: String,
    },
    category: {
        type: String,
    },
    experience: {
        type: String,
    },
    skills: [{
        type: String,
    }],
    deadline: {
        type: Date,  // Assuming deadline is a date field
    },
    requirements: [{
        type: String,
    }],
    responsibilities: [{
        type: String,
    }],
    tags: [{
        type: String,
    }],
    status: {
        type: String,
        default: 'Active',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    postedAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'Application',
    }]
}, {
    timestamps: true,
});

jobSchema.index({ title: 1 });

export default model('Job', jobSchema);