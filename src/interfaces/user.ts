interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    mobileNumber: string;
    profile?: string;
}

interface PersonalInformation {
    firstName: string;
    lastName: string;
    address: string;
}

interface ProfessionalInformation {
    resume: string;
    coverLetter: string;
    linkedInProfile: string;
    portfolio: string;
}

interface EducationalBackground {
    highestLevelOfEducation: string;
    schoolUniversityName: string;
    degreeEarned: string;
    graduationYear: string;
}

interface WorkExperience {
    companyName: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    responsibilitiesAccomplishments: string;
}

interface Skills {
    technicalSkills: Array<Skill>;
    softSkills: Array<Skill>;
}

interface Skill {
    name: string;
    experience: string;
}

interface Availability {
    fullTimePartTime: string;
    preferredWorkSchedule: string; 
}

interface RegisterInput {
    name: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPassword: string;
    role?: string;
    company?: string;   
    designation?: string;
}

interface LoginInput {
    email: string;
    password: string;
}

interface UserResponse {
    success: boolean;
    message: string;
    data?: ResponseData;
    token?: string; 
}

interface ResponseData {
    name: string;
    email: string;
    mobileNumber: string; 
}

interface UserProfileInput {
    personalInformation: PersonalInformation;
    professionalInformation: ProfessionalInformation;
    educationalBackground: Array<EducationalBackground>;
    workExperience: Array<WorkExperience>;
    skills: Skills;
    availability: Availability;
}

export {
    User,
    RegisterInput,
    LoginInput,
    UserResponse,
    UserProfileInput
}