export const mutations = `#graphql
    createUser(userInput: RegisterInput!): UserResponse
    loginUser(userInput: LoginInput!): UserResponse
    updateUserProfile(userInput: UserProfileInput!): UserResponse
`; 