import bcrypt from 'bcrypt'

const saltRounds: number = 12;


const hashPassword = async (password: string): Promise<string> => {

    try {
        const hash: string = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error('Error hashing password: ', error);
        throw error
    }
}


const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    try {
        const result: boolean = await bcrypt.compare(password, hash);
        return result;
    } catch (error) {
        console.error('Error comparing password: ', error);
        throw error
    }
}

export default {
    hashPassword,
    comparePassword
}