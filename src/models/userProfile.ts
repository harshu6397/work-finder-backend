import { Model, Schema, model } from "mongoose";
import { IUserProfile } from "../interfaces/model";

const userProfileSchema: Schema = new Schema<IUserProfile>({
    personalInformation: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        emailAddress: {
            type: String,
            required: true,
        },
    },
    professionalInformation: {
        resume: {
            type: String,
            required: true,
        },
        coverLetter: {
            type: String,
            required: true,
        },
        linkedInProfile: {
            type: String,
            required: true,
        },
        portfolio: {
            type: String,
            required: true,
        },
    },
    educationalBackground: {
        highestLevelOfEducation: {
            type: String,
            required: true,
        },
        schoolUniversityName: {
            type: String,
            required: true,
        },
        degreeEarned: {
            type: String,
            required: true,
        },
        graduationYear: {
            type: String,
            required: true,
        },
    },
    workExperience: {
        companyName: {
            type: String,
            required: true,
        },
        jobTitle: {
            type: String,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        responsibilitiesAccomplishments: {
            type: String,
            required: true,
        },
    },
    skills: {
        technicalSkills: {
            type: String,
            required: true,
        },
        softSkills: {
            type: String,
            required: true,
        },
    },
    availability: {
        fullTimePartTime: {
            type: String,
            required: true,
        },
        preferredWorkSchedule: {
            type: String,
            required: true,
        },
    },
});

export default model('UserProfile', userProfileSchema);;