import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.base": "name should be a type of 'text'",
        "string.empty": "name cannot be an empty field",
        "string.min": "name should have a minimum length of {#limit}",
        "any.required": "name is a required field"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "email should be a type of 'text'",
        "string.empty": "email cannot be an empty field",
        "string.email": "email must be a valid email",
        "any.required": "email is a required field"
    }),
    mobileNumber: Joi.string().min(10).max(10).required().messages({
        "string.base": "mobileNumber should be a type of 'text'",
        "string.empty": "mobileNumber cannot be an empty field",
        "string.min": "mobileNumber should have a minimum length of {#limit}",
        "any.required": "mobileNumber is a required field"
    }),
    password: Joi.string().min(6).required().messages({
        "string.base": "password should be a type of 'text'",
        "string.empty": "password cannot be an empty field",
        "string.min": "password should have a minimum length of {#limit}",
        "any.required": "password is a required field"
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'confirmPassword must be the same as password',
    }),
    company: Joi.string().optional(),
    designation: Joi.string().optional(),
    role: Joi.string().optional(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "email should be a type of 'text'",
        "string.empty": "email cannot be an empty field",
        "string.email": "email must be a valid email",
        "any.required": "email is a required field"
    }),
    password: Joi.string().min(6).required().messages({
        "string.base": "password should be a type of 'text'",
        "string.empty": "password cannot be an empty field",
        "string.min": "password should have a minimum length of {#limit}",
        "any.required": "password is a required field"
    }),
});

export const updateUserProfileSchema = Joi.object({
    personalInformation: Joi.object({
        firstName: Joi.string().min(3).max(30).messages({
            "string.base": "firstName should be a type of 'text'",
            "string.empty": "firstName cannot be an empty field",
            "string.min": "firstName should have a minimum length of {#limit}",
            "any.required": "firstName is a required field"
        }),
        lastName: Joi.string().min(3).max(30).messages({
            "string.base": "lastName should be a type of 'text'",
            "string.empty": "lastName cannot be an empty field",
            "string.min": "lastName should have a minimum length of {#limit}",
            "any.required": "lastName is a required field"
        }),
        address: Joi.string().min(3).max(30).messages({
            "string.base": "address should be a type of 'text'",
            "string.empty": "address cannot be an empty field",
            "string.min": "address should have a minimum length of {#limit}",
            "any.required": "address is a required field"
        }),
    }),
    professionalInformation: Joi.object({
        resume: Joi.string().messages({
            "string.base": "resume should be a type of 'text'",
            "string.empty": "resume cannot be an empty field",
            "any.required": "resume is a required field"
        }),
        coverLetter: Joi.string().messages({
            "string.base": "coverLetter should be a type of 'text'",
            "string.empty": "coverLetter cannot be an empty field",
            "any.required": "coverLetter is a required field"
        }),
        linkedInProfile: Joi.string().messages({
            "string.base": "linkedInProfile should be a type of 'text'",
            "string.empty": "linkedInProfile cannot be an empty field",
            "any.required": "linkedInProfile is a required field"
        }),
        portfolio: Joi.string().messages({
            "string.base": "portfolio should be a type of 'text'",
            "string.empty": "portfolio cannot be an empty field",
            "any.required": "portfolio is a required field"
        }),
    }),
    educationalBackground: Joi.array().items(Joi.object({
        highestLevelOfEducation: Joi.string().messages({
            "string.base": "highestLevelOfEducation should be a type of 'text'",
            "string.empty": "highestLevelOfEducation cannot be an empty field",
            "any.required": "highestLevelOfEducation is a required field"
        }),
        schoolUniversityName: Joi.string().messages({
            "string.base": "schoolUniversityName should be a type of 'text'",
            "string.empty": "schoolUniversityName cannot be an empty field",
            "any.required": "schoolUniversityName is a required field"
        }),
        degreeEarned: Joi.string().messages({
            "string.base": "degreeEarned should be a type of 'text'",
            "string.empty": "degreeEarned cannot be an empty field",
            "any.required": "degreeEarned is a required field"
        }),
        graduationYear: Joi.string().messages({
            "string.base": "graduationYear should be a type of 'text'",
            "string.empty": "graduationYear cannot be an empty field",
            "any.required": "graduationYear is a required field"
        }),
    })),
    workExperience: Joi.array().items(Joi.object({
        companyName: Joi.string().messages({
            "string.base": "companyName should be a type of 'text'",
            "string.empty": "companyName cannot be an empty field",
            "any.required": "companyName is a required field"
        }),
        jobTitle: Joi.string().messages({
            "string.base": "jobTitle should be a type of 'text'",
            "string.empty": "jobTitle cannot be an empty field",
            "any.required": "jobTitle is a required field"
        }),
        startDate: Joi.string().messages({
            "string.base": "startDate should be a type of 'text'",
            "string.empty": "startDate cannot be an empty field",
            "any.required": "startDate is a required field"
        }),
        endDate: Joi.string().messages({
            "string.base": "endDate should be a type of 'text'",
            "string.empty": "endDate cannot be an empty field",
            "any.required": "endDate is a required field"
        }),
        responsibilitiesAccomplishments: Joi.string().messages({
            "string.base": "responsibilitiesAccomplishments should be a type of 'text'",
            "string.empty": "responsibilitiesAccomplishments cannot be an empty field",
            "any.required": "responsibilitiesAccomplishments is a required field"
        }),
    })),
    skills: Joi.object({
        technicalSkills: Joi.array().items(Joi.object({
            name: Joi.string().messages({
                "string.base": "name should be a type of 'text'",
                "string.empty": "name cannot be an empty field",
                "any.required": "name is a required field"
            }),
            experience: Joi.string().messages({
                "string.base": "experience should be a type of 'text'",
                "string.empty": "experience cannot be an empty field",
                "any.required": "experience is a required field"
            }),
        })),
        softSkills: Joi.array().items(Joi.object({
            name: Joi.string().messages({
                "string.base": "name should be a type of 'text'",
                "string.empty": "name cannot be an empty field",
                "any.required": "name is a required field"
            }),
            experience: Joi.string().messages({
                "string.base": "experience should be a type of 'text'",
                "string.empty": "experience cannot be an empty field",
                "any.required": "experience is a required field"
            }),
        })),
    }),
    availability: Joi.object({
        fullTimePartTime: Joi.string().messages({
            "string.base": "fullTimePartTime should be a type of 'text'",
            "string.empty": "fullTimePartTime cannot be an empty field",
            "any.required": "fullTimePartTime is a required field"
        }),
        preferredWorkSchedule: Joi.string().messages({
            "string.base": "preferredWorkSchedule should be a type of 'text'",
            "string.empty": "preferredWorkSchedule cannot be an empty field",
            "any.required": "preferredWorkSchedule is a required field"
        }),
    }),
});