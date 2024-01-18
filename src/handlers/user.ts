import User from "../models/User";
import { GraphQLError } from "graphql";

/**
 * Method to check whether the user exists in the database or not
 * @param email
 * @param name
 * @returns boolean 
 */
export const checkIfuserExists = async (email: string) => {
    try {
        const user = await User.findOne({email});
        console.log(":::: user ::::", user);
        if (user) {
            return true;
        } 
        return false;
    } catch (error: any) {
        return new GraphQLError(error);
    }  
}

