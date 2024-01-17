import { Model, Schema, model } from "mongoose";
import { IUserProfile } from "../interfaces/model";

const userProfileSchema: Schema = new Schema<IUserProfile>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    personalInformation: {
        firstName: { type: String, },
        lastName: { type: String, },
        address: { type: String, },
    },
    professionalInformation: {
        resume: { type: String, },
        coverLetter: { type: String, },
        linkedInProfile: { type: String, },
        portfolio: { type: String, },
    },
    educationalBackground: [{
        highestLevelOfEducation: { type: String, },
        schoolUniversityName: { type: String, },
        degreeEarned: { type: String, },
        graduationYear: { type: String, },
    }],
    workExperience: [{
        companyName: { type: String, },
        jobTitle: { type: String, },
        startDate: { type: String, },
        endDate: { type: String, },
        responsibilitiesAccomplishments: { type: String, },
    }],
    skills: {
        technicalSkills: [{ name: { type: String, }, experience: { type: String, }, }],
        softSkills: [{ name: { type: String, }, experience: { type: String, }, }]
    },
    availability: {
        fullTimePartTime: { type: String, default: 'Full Time' },
        preferredWorkSchedule: { type: String, default: 'Day Shift' },
    },
});

export default model('UserProfile', userProfileSchema);;