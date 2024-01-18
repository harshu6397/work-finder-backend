const Joi = require('joi');
const { Types } = require('mongoose');

export const createJobSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Title is required.',
        'any.required': 'Title is required.',
    }),
    company: Joi.string().required().messages({
        'string.empty': 'Company is required.',
        'any.required': 'Company is required.',
    }),
    jobLocation: Joi.string().messages({
        'string.empty': 'Job location cannot be empty.',
    }),
    description: Joi.string(),
    salary: Joi.object({
        min: Joi.number(),
        max: Joi.number(),
        currency: Joi.string(),
    }),
    type: Joi.string(),
    category: Joi.string(),
    experience: Joi.string(),
    skills: Joi.array().items(Joi.string()),
    requirements: Joi.array().items(Joi.string()),
    responsibilities: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),  
    deadline: Joi.date().messages({
        'date.base': 'Invalid deadline format. Please provide a valid date.',
    }),
    status: Joi.string(),
    createdBy: Joi.string().custom((value: string, helpers: any) => {
        if (!Types.ObjectId.isValid(value)) {
            return helpers.message('Invalid ObjectId format for createdBy.');
        }
        return value;
    }),
    updatedBy: Joi.string().custom((value: string, helpers: any) => {
        if (value && !Types.ObjectId.isValid(value)) {
            return helpers.message('Invalid ObjectId format for updatedBy.');
        }
        return value;
    }),
    postedAt: Joi.date().default(new Date()),
    updatedAt: Joi.date().default(new Date()),
    expiresAt: Joi.date().messages({
        'date.base': 'Invalid expiresAt format. Please provide a valid date.',
    }),
    contact: Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
    }),
    applications: Joi.array().items(Joi.string().custom((value: string, helpers: any) => {
        if (!Types.ObjectId.isValid(value)) {
            return helpers.message('Invalid ObjectId format for application.');
        }
        return value;
    })),
});

export const jobQuerySchema = Joi.object({
    jobId: Joi.string().messages({
        "string.base": "jobId should be a type of 'text'",
        "string.empty": "jobId cannot be an empty field",
        "any.required": "jobId is a required field"
    }),
});

export const updateJobSchema = Joi.object({
    title: Joi.string().messages({
        "string.base": "title should be a type of 'text'",
        "string.empty": "title cannot be an empty field",
        "any.required": "title is a required field" 
    }),
    description: Joi.string().messages({
        "string.base": "description should be a type of 'text'",
        "string.empty": "description cannot be an empty field",
        "any.required": "description is a required field"
    }),
    jobLocation: Joi.string().messages({
        "string.base": "location should be a type of 'text'",
        "string.empty": "location cannot be an empty field",
        "any.required": "location is a required field"
    }),
    company: Joi.string().messages({
        "string.base": "company should be a type of 'text'",
        "string.empty": "company cannot be an empty field",
        "any.required": "company is a required field"
    }),
    salary: Joi.string().messages({
        "string.base": "salary should be a type of 'text'",
        "string.empty": "salary cannot be an empty field",
        "any.required": "salary is a required field"
    }),
    experience: Joi.string().messages({
        "string.base": "experience should be a type of 'text'",
        "string.empty": "experience cannot be an empty field",
        "any.required": "experience is a required field"
    }),
    skills: Joi.string().messages({
        "string.base": "skills should be a type of 'text'",
        "string.empty": "skills cannot be an empty field",
        "any.required": "skills is a required field"
    }),
    type: Joi.string().messages({
        "string.base": "jobType should be a type of 'text'",
        "string.empty": "jobType cannot be an empty field",
        "any.required": "jobType is a required field"
    }),
    category: Joi.string().messages({
        "string.base": "jobCategory should be a type of 'text'",
        "string.empty": "jobCategory cannot be an empty field",
        "any.required": "jobCategory is a required field"
    }),
    status: Joi.string().messages({
        "string.base": "jobStatus should be a type of 'text'",
        "string.empty": "jobStatus cannot be an empty field",
        "any.required": "jobStatus is a required field"
    }),
    deadline: Joi.string().messages({
        "string.base": "jobDeadline should be a type of 'text'",
        "string.empty": "jobDeadline cannot be an empty field",
        "any.required": "jobDeadline is a required field"
    }),
    createdBy: Joi.string().messages({
        "string.base": "jobCreatedBy should be a type of 'text'",
        "string.empty": "jobCreatedBy cannot be an empty field",
        "any.required": "jobCreatedBy is a required field"
    }),
    updatedBy: Joi.string().messages({
        "string.base": "jobUpdatedBy should be a type of 'text'",
        "string.empty": "jobUpdatedBy cannot be an empty field",
        "any.required": "jobUpdatedBy is a required field"
    }),
});

export const deleteJobSchema = Joi.object({
    jobId: Joi.string().required().messages({
        "string.base": "jobId should be a type of 'text'",
        "string.empty": "jobId cannot be an empty field",
        "any.required": "jobId is a required field"
    }),
});