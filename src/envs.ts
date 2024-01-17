import { config } from 'dotenv'

config();

export default {
    port: process.env.PORT || 3000,
    graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
    dbUrl: process.env.MONGO_URI || 'mongodb://mongo:27017/work-finder',
    dbUrlLocal: process.env.MONGO_URI_LOCAL || 'mongodb://mongo:27017/work-finder',
    bcryptSalt: process.env.BCRYPT_SALT_ROUNDS || 10,
}
  