import { Types } from "mongoose";

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    role: string;
    company: string;
    designation: string;
    profile: Types.ObjectId;
}

export interface IUserProfile extends Document {
    _id: string;
    personalInformation: PersonalInformation;
    professionalInformation: professionalInformation;
    educationalBackground: educationalBackground;
    workExperience: workExperience;
    skills: skills;
    availability: availability;
}

interface PersonalInformation {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    emailAddress: string;
}

interface professionalInformation {
    resume: string;
    coverLetter: string;
    linkedInProfile: string;
    portfolio: string;
}

interface educationalBackground {
    highestLevelOfEducation: string;
    schoolUniversityName: string;
    degreeEarned: string;
    graduationYear: string;
}

interface workExperience {
    companyName: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    responsibilitiesAccomplishments: string;
}

interface skills {
    technicalSkills: string;
    softSkills: string;
}

interface availability {
    fullTimePartTime: string;
    preferredWorkSchedule: string;
}