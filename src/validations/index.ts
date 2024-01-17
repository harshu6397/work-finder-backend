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