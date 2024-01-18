export const mutations = `#graphql
    createJob(jobInput: JobInput!): JobResponse
    updateJob(jobId: ID!, updateJobInput: UpdateJobInput!): JobResponse
    deleteJob(jobId: ID!): JobResponse
`; 