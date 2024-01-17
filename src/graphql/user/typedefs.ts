import { queries } from "./queries";
import { mutations } from "./mutations";

export const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        mobileNumber: String
    }

    type UserData {
        name: String!
        email: String!
        mobileNumber: String
        profile: UserProfile
    }

    type UserProfile {
        personalInformation: PersonalInformation
        professionalInformation: ProfessionalInformation
        educationalBackground: [EducationalBackground]
        workExperience: [WorkExperience]
        skills: Skills
        availability: Availability
    }

    type PersonalInformation {
        firstName: String
        lastName: String
        address: String
    }

    type ProfessionalInformation {
        resume: String
        coverLetter: String
        linkedInProfile: String
        portfolio: String
    }

    type EducationalBackground {
        highestLevelOfEducation: String
        schoolUniversityName: String
        degreeEarned: String
        graduationYear: String
    }

    type WorkExperience {
        companyName: String
        jobTitle: String
        startDate: String
        endDate: String
        responsibilitiesAccomplishments: String
    }

    type Skills {
        technicalSkills: String
        softSkills: String
    }

    type Availability {
        fullTimePartTime: String
        preferredWorkSchedule: String
    }

    type UserResponse { 
        success: Boolean!
        message: String!
        data: ResponseData
        token: String
    }   

    type ResponseData {
        name: String
        email: String
        mobileNumber: String    
    }

    input UserProfileInput {
        personalInformation: PersonalInformationInput
        professionalInformation: ProfessionalInformationInput
        educationalBackground: [EducationalBackgroundInput]
        workExperience: [WorkExperienceInput]
        skills: SkillsInput
        availability: AvailabilityInput 
    }
    input PersonalInformationInput {
        firstName: String
        lastName: String
        address: String
    }

    input ProfessionalInformationInput {
        resume: String
        coverLetter: String
        linkedInProfile: String
        portfolio: String
    }

    input EducationalBackgroundInput {
        highestLevelOfEducation: String
        schoolUniversityName: String
        degreeEarned: String
        graduationYear: String
    }

    input WorkExperienceInput {
        companyName: String
        jobTitle: String
        startDate: String
        endDate: String
        responsibilitiesAccomplishments: String
    }

    input SkillsInput {
        technicalSkills: [Skill]
        softSkills: [Skill]
    }

    input Skill {
        name: String
        experience: String
    }

    input AvailabilityInput {
        fullTimePartTime: String
        preferredWorkSchedule: String
    }

    input RegisterInput {
        name: String!
        email: String!
        password: String!
        mobileNumber: String!
        confirmPassword: String!
        company: String
        designation: String
        role: String
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
        ${queries}
    }

    type Mutation {
        ${mutations}
    }
`;