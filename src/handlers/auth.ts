import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import envs from '../envs'

/**
 * Method to hash password 
 * @param password
 * @returns hashed password
 */
export const hashPassword = async (password: string) => {
    try{
        const salt = await bcryptjs.genSalt(parseInt(envs.bcryptSalt as string));
        return await bcryptjs.hash(password, salt);
    } catch (error: any) {
        throw new Error(error);
    }
}

/**
 * Method to check password
 * @param password
 * @param userPassword
 * @returns boolean
 */
export const checkPassword = async (password: string, userPassword: string) => {
    try {
        return await bcryptjs.compare(password, userPassword);
    } catch (error: any) {
        throw new Error(error);
    }
} 

/**
 * Method to generate token
 * @param user
 * @returns token
 */
export const createToken = (user: any) => {
    try{
        return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1d', algorithm: 'HS256' });
    } catch (error: any) {
        throw new Error(error);
    }
}

/**
 * Method to verify token
 * @param token
 * @returns decoded token
 */
export const verifyToken = (token: string) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error: any) {
        throw new Error(error);
    }
}
