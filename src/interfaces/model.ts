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
    userId: Types.ObjectId;
    personalInformation: PersonalInformation;
    professionalInformation: professionalInformation;
    educationalBackground: Array<educationalBackground>;
    workExperience: Array<workExperience>;
    skills: skills;
    availability: availability;
}

interface PersonalInformation {
    firstName: string;
    lastName: string;
    address: string;
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
    technicalSkills: Array<Skill>
    softSkills: Array<Skill>
}

interface Skill {
    name: string;
    experience: string;
}

interface availability {
    fullTimePartTime: string;
    preferredWorkSchedule: string;
}