import { ObjectId } from "mongoose";

export interface JobInput {
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
    createdBy: ObjectId;
    updatedBy?: ObjectId;
    postedAt?: Date;
    updatedAt?: Date;
    expiresAt?: Date;
}

export interface UpdateJobInput {
    title?: string;
    company?: string;
    jobLocation?: string;
    description?: string;
    salary?: Salary;
    type?: string;
    category?: string;
    experience?: string;
    skills?: string[];
    deadline?: Date;
    status?: string;
    createdBy: ObjectId;
    updatedBy?: ObjectId;
    postedAt?: Date;
    updatedAt?: Date;
    expiresAt?: Date;
}

interface Salary {
    min: number;
    max: number;
    currency: string;
}

export interface JobResponse {
    success: boolean;
    message: string;
    data: JobData;
}

export interface JobData {
    id: string;
    title: string;
    description: string;
    company: string;
    jobLocation: string;
    salary: Salary
    createdAt: string;
    updatedAt: string;
}

export interface JobQueryResponse {
    success: boolean;
    message: string;
    data: Array<JobData>;
}

export interface JobQuery {
    id: string;
}

export interface JobMutationResponse {
    success: boolean;
    message: string;
    data: JobData;
}

