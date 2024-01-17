import { createUserSchema, loginUserSchema, updateUserProfileSchema } from '../../validations';
import { LoginInput, RegisterInput, UserProfileInput } from '../../interfaces/user';
import { GraphQLError } from 'graphql';
import { successResponse } from '../../handlers/responses';
import { validateUserInput } from '../../handlers/validate';
import UserService from '../../services/user/user';

const queries = {
    getUsers: async () => await UserService.getUsers(),
    getUser: async (_: any, __: any, contextValue: any) => {
        return await UserService.getUser(contextValue.email)
    }
}

const mutations = {
    createUser: async (_: any, { userInput }: { userInput: RegisterInput }) => {
        try {
            // Validate user input
            validateUserInput(userInput, createUserSchema);

            const response = await UserService.createUser(userInput);

            return successResponse(
                response.success,   
                response.message,
                {
                    data: {
                        name: response.user.name,
                        email: response.user.email,
                        mobileNumber: response.user.mobileNumber,
                    },
                    token: response?.accessToken
                }
            );
        } catch (error: any) {
            return new GraphQLError(error);
        }
    },

    loginUser: async (_: any, { userInput }: { userInput: LoginInput }) => {
        try {
            // Validate user input
            validateUserInput(userInput, loginUserSchema);

            const response = await UserService.login(userInput);

            return successResponse(
                response.success,
                response.message,
                {
                    data: {
                        name: response.user.name,
                        email: response.user.email,
                        mobileNumber: response.user.mobileNumber,
                    },
                    token: response?.accessToken
                }
            );
        } catch (error: any) {
            return new GraphQLError(error);
        }
    },

    updateUserProfile: async (_: any, { userInput }: { userInput: UserProfileInput }, contextValue: any) => {
        try {
            console.log(contextValue)
            // Validate user input
            validateUserInput(userInput, updateUserProfileSchema);

            const response = await UserService.updateProfile(userInput, contextValue.email);

            return successResponse(
                response.success,
                response.message,
            );
        } catch (error: any) {
            return new GraphQLError(error);
        }
    }
}

export const resolvers = {
    Query: queries,
    Mutation: mutations
}