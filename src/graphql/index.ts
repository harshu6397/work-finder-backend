import { ApolloServer, BaseContext } from "@apollo/server";
import { User } from "./user";
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { errorResponse } from "../handlers/responses";
import errorMessages from "../config/errorMessages.json";

async function createApolloServer() {
    const server = new ApolloServer<BaseContext>({
        typeDefs: `#graphql 
            ${User.typeDefs}
        `,
        resolvers: {
            ...User.resolvers,
        },
        formatError: (formattedError, error) => {
            // Return a different error message
            if (
              formattedError?.extensions?.code === ApolloServerErrorCode?.GRAPHQL_VALIDATION_FAILED
            ) {
              return {
                ...formattedError,
                message: "Your query doesn't match the schema. Try double-checking it!",
              };
            }
        
            // Otherwise return the formatted error. This error can also
            // be manipulated in other ways, as long as it's returned.
            console.log(":::: formattedError ::::", formattedError);
            return errorResponse(
                formattedError?.extensions?.code === ApolloServerErrorCode?.BAD_USER_INPUT ? errorMessages.somethingWentWrong : formattedError?.message,
                formattedError?.extensions?.code === ApolloServerErrorCode?.BAD_USER_INPUT ? 400 : 500,
            );
          },
    });
    await server.start();
    return server;
}

export default createApolloServer;