import { NextFunction, Request,Response } from "express";
import {httpstatus} from "../utils/httpstatus";
import customError from "../utils/CustomError";
import { hashPassword,verifyPassword } from "../utils/argon2";
import logger from "../utils/logger";

import {
    addStudent,
    getStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    signIn

} from "../helpers/student";

export const registerStudent = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        const data:any = req.body
        data.password = await hashPassword(data.password)
        const student = await addStudent(data)
        delete data.password

        res.status(httpstatus.OK).json({message:"Student Registered Successfully", student})

    }catch(error: any){
        console.log(error)
        logger.error(error)
        next(new customError(500, error.toString()))
    }
};

export const getStudents = async(req:Request,res: Response,next: NextFunction)=>{
    try{
        const student = await getStudent()
    res.status(httpstatus.OK).json({student})

    }catch(error: any){
        console.log(error)
        logger.error(error)
        next(new customError(500, error.toString()))
    }
};

export const getStudentsById = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {studentId} = req.params
        const student = await getStudentById(studentId)
        res.status(httpstatus.OK).json({student})

    }catch(error: any){
        console.log(error)
        logger.error(error)
        next(new customError(500, error.toString()))
    }
};

export const updateStudentData = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {studentId} = req.params
        const data = req.body
        const student = await updateStudent(studentId, data)
        res.status(httpstatus.OK).json({student})

    }catch(error: any){
        console.log(error)
        logger.error(error)
        next(new customError(500, error.toString()))
    }
};

export const deleteStudentData = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {studentId} = req.params
        const student = await deleteStudent(studentId)
        res.status(httpstatus.OK).json({message: "Student removed successfully", student})

    }catch(error: any){
        console.log(error)
        logger.error(error)
        next(new customError(500, error.toString()))
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {telephone,password}:{telephone: string, password: string}  = req.body;
        const login = signIn(telephone)
        const studentPassword = req.student.password
        if(!telephone){
            res.status(httpstatus.UNAUTHORIZED).json({message:"Invalid Credentials"})
        }else{

            const checkPassword = await verifyPassword(password, studentPassword);
            if (!checkPassword) {

            throw new customError(400, 'Invalid credentials');
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
        next(new customError(500, error.toString()))
    }
};