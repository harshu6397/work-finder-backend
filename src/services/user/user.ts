import { LoginInput, RegisterInput, UserProfileInput } from "../../interfaces/user";
import User from '../../models/User';
import UserProfile from "../../models/UserProfile";
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

            // create user profile
            const profile = await UserProfile.create({
                userId: user._id,
                personalInformation: {
                    firstName: '',
                    lastName: '',
                    address: '',
                },
                professionalInformation: {
                    resume: '',
                    coverLetter: '',
                    linkedInProfile: '',
                    portfolio: '',
                },
                educationalBackground: [],
                workExperience: [],
                skills: {
                    technicalSkills: [],
                    softSkills: [],
                },
                availability: {
                    fullTimePartTime: '',
                    preferredWorkSchedule: '',
                }
            })
            
            // update user profile id in user
            user.profile = profile._id;
            await user.save();

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

    private static async getUserById(_id: string) {
        try {
            const user = await User.findById({ _id }).populate('profile');
            return user ? user : null;
        } catch (error: any) {
            console.log(error)
            throw new GraphQLError(error);
        }
    }


    public static async getUsers() {
        try {
            const users = await User.find();
            return users
        } catch (error: any) {
            console.log(error)
            return []
        }
    }

    public static async getUser(_id: string) {
        try {
            const user = await this.getUserById(_id);

            if (!user) {
                throw new GraphQLError(errorMessages.userDoesNotExist);
            }

            return {
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber,
                profile: user.profile,
            }
        } catch (error: any) {
            console.log(error)
            throw new GraphQLError(error);
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

            return { _id: user._id, email: user.email };
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    public static async updateProfile(payload: UserProfileInput, _id: string) {
        console.log("payload", payload);
        try {
            const user = await this.getUserById(_id);
            if (!user) {
                throw new GraphQLError(errorMessages.userDoesNotExist);
            }

            const userProfileData = await UserProfile.findOne({ userId: user._id });
            if (!userProfileData) {
                throw new GraphQLError(errorMessages.userProfileDoesNotExist);
            }

            // update user profile 
            await UserProfile.updateOne({
                personalInformation: {
                    firstName: payload?.personalInformation?.firstName || "",
                    lastName: payload?.personalInformation?.lastName || "",
                    address: payload?.personalInformation?.address || "",
                },
                professionalInformation: {
                    resume: payload?.professionalInformation?.resume || "",
                    coverLetter: payload?.professionalInformation?.coverLetter || "",
                    linkedInProfile: payload?.professionalInformation?.linkedInProfile || "",
                    portfolio: payload?.professionalInformation?.portfolio || "",
                },
                educationalBackground: payload?.educationalBackground || [],
                workExperience: payload?.workExperience || [],
                skills: {
                    technicalSkills: payload?.skills?.technicalSkills || [],
                    softSkills: payload?.skills?.softSkills || [],
                },
                availability: {
                    fullTimePartTime: payload?.availability?.fullTimePartTime || "",
                    preferredWorkSchedule: payload?.availability?.preferredWorkSchedule || "",
                }
            });

            return {
                message: successMessages.profileUpdateSuccess,
                success: true,
            }
        } catch (error: any) {
            console.log(error)
            throw new GraphQLError(error);
        }
    }

}

export default UserService;