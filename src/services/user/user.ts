import { LoginInput, RegisterInput } from "../../interfaces/user";
import User from '../../models/user';
import errorMessages from '../../config/errorMessages.json';
import successMessages from '../../config/successMessages.json';
import { checkIfuserExists } from "../../handlers/user";
import { GraphQLError } from "graphql";
import { createToken, hashPassword, verifyToken, checkPassword } from "../../handlers/auth";

class UserService {
    public static async createUser(payload: RegisterInput) {
        try {
            const userExists = await checkIfuserExists(payload.email);
            if (userExists) {
                throw new GraphQLError(errorMessages.userAlreadyExists);
            }

            // hash password
            const hashedPassword = await hashPassword(payload.password);

            // create user
            const user = await User.create({
                name: payload.name,
                email: payload.email,
                password: hashedPassword,
                mobileNumber: payload.mobileNumber,
                role: payload.role,
                company: payload.company,
                designation: payload.designation,
            });

            // create a jwt token
            const token = createToken(user);

            return {
                message: successMessages.signupSuccess,
                success: true,
                user: {
                    name: user.name,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                },
                accessToken: token
            }

        } catch (error: any) {
            throw new GraphQLError(error);
        }
    }

    public static async login(payload: LoginInput) {
        try {
            // find user by email
            const user = await User.findOne({ email: payload.email });
            if (!user) {
                throw new GraphQLError(errorMessages.userDoesNotExist);
            }

            // compare password
            const isPasswordValid = await checkPassword(payload.password, user.password);
            if (!isPasswordValid) {
                throw new GraphQLError(errorMessages.invalidPassword);
            }

            // create a jwt token
            const token = createToken(user);

            return {
                message: successMessages.loginSuccess,
                success: true,
                user: {
                    name: user.name,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                },
                accessToken: token
            }
        } catch (error: any) {
            console.log(error)
            throw new GraphQLError(error);
        }
    }

    private static async getUserByEmail(email: string) {
        try {
            const user = await User.findOne({email})
            return user ? user : null;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public static async getUsers() {
        try {
            const users = await User.find();
            return users
        } catch (error) {
            console.log(error)
            return []
        }
    }

    public static async getUser(email: string) {
        try {
            const user = await this.getUserByEmail(email);

            if (!user) {
                return null;
            }

            return {
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber,
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

    public static decodeToken(token: string): any {
        try {
            return verifyToken(token);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public static async getUserFromToken(token: string | undefined) {
        try {
            if (!token) {
                return null;
            }
            const decodedToken = this.decodeToken(token);
            const user = await User.findOne({
                _id: decodedToken.id
            })

            if (!user) {
                return null;
            }

            return decodedToken.email;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}

export default UserService;