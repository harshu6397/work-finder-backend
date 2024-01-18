import { createJobSchema, updateJobSchema, jobQuerySchema, deleteJobSchema } from '../../validations/job';
import { JobInput, UpdateJobInput } from '../../interfaces/job';
import { GraphQLError } from 'graphql';
import { successResponse } from '../../handlers/responses';
import { validateUserInput } from '../../handlers/validate';
import UserService from '../../services/user/user';
import JobService from '../../services/job';

const queries = {
    getJobs: async () => {
        try {
            const response = await JobService.getJobs();

            return successResponse(
                response.success,
                response.message,
                {
                    data: response?.jobs
                }
            )
        } catch (error: any) {
            return new GraphQLError(error);
        }
    },

    getJob: async (_: any, { jobId }: { jobId: string }) => {
        try {
            validateUserInput({ jobId }, jobQuerySchema);
            const response = await JobService.getJob(jobId);

            return successResponse(
                response.success,
                response.message,
                {
                    data: response?.job
                }
            )
        } catch (error: any) {
            return new GraphQLError(error);
        }
    }
}

const mutations = {
    createJob: async (_: any, { jobInput }: { jobInput: JobInput }, { user }: any) => {
        try {
            // Validate user input
            validateUserInput(jobInput, createJobSchema);

            const response = await JobService.createJob(jobInput, user._id);

            return successResponse(
                response.success,
                response.message,
                {
                    data: response?.job
                }
            );
        } catch (error: any) {
            throw new GraphQLError(error);
        }
    },

    updateJob: async (_: any, { jobId, updateJobInput }: { jobId: string, updateJobInput: UpdateJobInput }, { user }: any) => {
        try {
            // Validate user input
            validateUserInput(updateJobInput, updateJobSchema);
            validateUserInput({ jobId }, jobQuerySchema);

            const response = await JobService.updateJob(jobId, updateJobInput, user._id);

            return successResponse(
                response.success,
                response.message,
                {
                    data: {
                        id: response?.job?.id,
                        title: response?.job?.title,
                        description: response?.job?.description,
                        company: response?.job?.company,
                        jobLocation: response?.job?.jobLocation,
                        salary: response?.job?.salary,
                        requirements: response?.job?.requirements,
                        responsibilities: response?.job?.responsibilities,
                        createdAt: response?.job?.createdAt,
                        updatedAt: response?.job?.updatedAt,
                    }
                }
            );
        } catch (error: any) {
            return new GraphQLError(error);
        }
    },

    deleteJob: async (_: any, { jobId }: { jobId: string }, { user }: any) => {
        try {
            // Validate user input
            validateUserInput({ jobId }, deleteJobSchema);

            const response = await JobService.deleteJob(jobId, user._id);

            return successResponse(
                response.success,
                response.message
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