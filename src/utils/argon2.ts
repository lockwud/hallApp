import * as argon2 from "argon2";




export const hashPassword = async (password: string): Promise<string> => {

    try {
        const hash: string = await argon2.hash(password);
        return hash;
    } catch (error) {
        console.error('Error hashing password: ', error);
        throw error
    }
}


export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    try {
        const result: boolean = await argon2.verify(hash, password);
        return result;
    } catch (error) {
        console.error('Error comparing password: ', error);
        throw error
    }
}

