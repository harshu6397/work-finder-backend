import { queries } from "./queries";
import { mutations } from "./mutations";

export const typeDefs = `#graphql
    type JobData {
        id: ID!
        title: String!
        company: String!
        description: String!
        salary: SalaryType!
        jobLocation: String!
        type: String!
        category: String!
        experience: String!
        skills: [String]!
        requirements: [String]!
        responsibilities: [String]!
        tags: [String]!
        deadline: String!
        createdBy: UserResponseData!
        status: String!
        postedAt: String!
        createdAt: String!
        updatedAt: String!
    }

    type SalaryType {
        min: Int!
        max: Int!
        currency: String!
    }

    input JobInput {
        title: String!
        company: String!
        jobLocation: String
        description: String
        salary: Salary
        type: String
        category: String
        experience: String
        skills: [String]
        requirements: [String]  
        responsibilities: [String]
        tags: [String]
        deadline: String
        status: String
        postedAt: String
        updatedAt: String
        expiresAt: String
    }

    input UpdateJobInput {
        title: String
        company: String
        jobLocation: String
        description: String
        salary: Salary
        type: String
        category: String
        experience: String
        skills: [String]
        requirements: [String]  
        responsibilities: [String]
        tags: [String]  
        deadline: String
        status: String
        postedAt: String
        updatedAt: String
        expiresAt: String
    }

    input Salary {   
        min: Int
        max: Int
        currency: String
    }

    type JobResponse {
        success: Boolean!
        message: String!
        data: JobData
    }

    type JobQueryResponse {
        success: Boolean!
        message: String!
        data: [JobData]
    }

    type Query {
        ${queries}
    }

    type Mutation {
        ${mutations}
    }
`;