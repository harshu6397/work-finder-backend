import { GraphQLError } from "graphql";
import { JobInput, UpdateJobInput } from "../../interfaces/job";
import Job from "../../models/Job";
import User from "../../models/User";

class JobService {
    public static async getJobs() {
        try {
            const jobs = await Job.find();
            return {
                success: true,
                message: 'Jobs fetched successfully',
                jobs,
            }
        } catch (error: any) {
            console.log(error)
            throw new GraphQLError(error);
        }
    }

    public static async getJob(id: string) {
        try {
            console.log(id)
            const job = await Job.findById(id).populate('createdBy');

            if (!job) {
                throw new GraphQLError('Job not found');
            }
            console.log(job)

            return {
                success: true,
                message: 'Job fetched successfully',
                job,
            }
        } catch (error: any) {
            console.log(error)
            throw new GraphQLError(error);
        }
    }

    public static async createJob(jobInput: JobInput, _id: string) {
        try {
            // find user by email
            const user = await User.findById(_id);

            if (!user) {
                throw new GraphQLError('User not found');
            }
 
            // check if job already exists
            const jobExists = await Job.findOne({ title: jobInput.title, company: jobInput.company });
            if(jobExists) {
                throw new GraphQLError('Job already exists');
            }

            // create job
            const job = await Job.create({
                ...jobInput,
                createdBy: user._id,
            });

            // add job to user
            job.createdBy = user;

            return {
                success: true,
                message: 'Job created successfully',
                job,
            }

        } catch (error: any) {
            console.log(error)
            throw new GraphQLError(error);
        }
    }

    public static async updateJob(id: string, updateJobInput: UpdateJobInput, _id: string) {
        try {
            // find user by email
            const user = await User.findById(_id);

            if (!user) {
                throw new GraphQLError('User not found');
            }

            // find job by id
            const job = await Job.findById(id);

            if (!job) {
                throw new GraphQLError('Job not found');
            }

            // update job
            const updatedJob = await Job.findByIdAndUpdate(id, {
                ...updateJobInput,
                updatedBy: user._id,
            }, { new: true });

            return {
                success: true,
                message: 'Job updated successfully',
                job: updatedJob,
            }

        } catch (error: any) {
            console.log(error)
            throw new GraphQLError(error);
        }
    }

    public static async deleteJob(id: string, userId: string) {
        try {
            // find user by email
            const user = await User.findById(userId);

            if (!user) {
                throw new GraphQLError('User not found');
            }

            // find job by id
            const job = await Job.findById(id);

            if (!job) {
                throw new GraphQLError('Job not found');
            }

            // delete job
            await Job.findByIdAndDelete(id);

            return {
                success: true,
                message: 'Job deleted successfully',
            }

        } catch (error: any) {
            console.log(error)
            throw new GraphQLError(error);
        }
    }
}

export default JobService;