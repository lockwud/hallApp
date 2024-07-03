import { NextFunction, Request, Response } from "express";
import { httpstatus } from "../utils/httpstatus";
import customError from "../utils/CustomError";
import { hashPassword, verifyPassword } from "../utils/argon2";
import logger from "../utils/logger";
import { cloudinary } from "../utils/cloudinary"




import {
    addStudent,
    getStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    signIn

} from "../helpers/student";


export const registerStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const data: any = req.body

        data.password = await hashPassword(data.password)
        data.level = parseInt(data.level)

        const profile = req.file ? req.file.path : undefined;
        if (profile) {
            const uploaded = await cloudinary.uploader.upload(profile, {
                folder: "student/profile",
            });
            if (uploaded) {
                data.profile = uploaded.secure_url;
            }
        }
        const student = await addStudent(data)
        if (!student) {
            throw new customError(httpstatus.INTERNAL_SERVER_ERROR, "An Error Occured")
        }
        //   destructure  the password out of the student object 
        const { password, ...studentWithoutPassword } = student;
        // clear this comment
        //  if you want you can put the studentwithoutpassword in the  student variable but you will have to change it to const

        res.status(httpstatus.OK).json({ message: "Student Registered Successfully", studentWithoutPassword })

    } catch (error: any) {
        console.log(error)
        logger.error(error)
        next(new customError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await getStudent()
        res.status(httpstatus.OK).json({ student })

    } catch (error: any) {
        console.log(error)
        logger.error(error)
        next(new customError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};

export const getStudentsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params
        const student = await getStudentById(studentId)
        res.status(httpstatus.OK).json({ student })

    } catch (error: any) {
        console.log(error)
        logger.error(error)
        next(new customError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};

export const updateStudentData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params
        console.log("check student id",studentId);
        const data = req.body
        const student = await updateStudent(studentId, data)
        res.status(httpstatus.OK).json({ student })

    } catch (error: any) {
        console.log(error)
        logger.error(error)
        next(new customError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};

export const deleteStudentData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params
        const student = await deleteStudent(studentId)
        res.status(httpstatus.OK).json({ message: "Student removed successfully", student })

    } catch (error: any) {
        console.log(error)
        logger.error(error)
        next(new customError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { telephone, password }: { telephone: string, password: string } = req.body;
        const login = signIn(telephone)
        const studentPassword = req.student.password
        if (!telephone) {
            res.status(httpstatus.UNAUTHORIZED).json({ message: "Invalid Credentials" })
        } else {

            const checkPassword = await verifyPassword(password, studentPassword);
            if (!checkPassword) {

                throw new customError(httpstatus.BAD_REQUEST, 'Invalid credentials');
            } else {
                delete req.student.password;
                res.status(httpstatus.OK).json({
                    message: 'Student successfully logged in!',
                    id: req.student.studentId

                });
            }

        }


    } catch (error: any) {
        logger.error(error)
        next(new customError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};