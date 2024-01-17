import Joi from "joi";

export const validateUserInput = (input: Record<string, any>, schema: Joi.ObjectSchema) => {
    const { error } = schema.validate(input);
    if (error) {
        throw new Error(error.details[0].message);
    }
};
    