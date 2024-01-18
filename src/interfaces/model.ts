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

export interface IJob extends Document {
    title: string;
    company: string;
    jobLocation?: string;
    description?: string;
    salary?: Salary;
    type?: string;
    category?: string;
    experience?: string;
    skills?: string[];
    deadline?: Date;
    status?: string;
    requirements?: string[];
    responsibilities?: string[];
    tags?: string[];
    createdBy: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    postedAt: Date;
    updatedAt: Date;
    expiresAt?: Date;
    applications?: Types.ObjectId[];
}

interface Salary {
    min: number;
    max: number;
    currency: string;    
}