import { NextFunction, Request,Response } from "express"
import {httpstatus} from "../utils/httpstatus"
import prisma from "../utils/prismaUtil"
import {verifyPassword , hashPassword} from "../utils/argon2"

export const addstudent = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const data:any = req.body;
        const student = await prisma.student.create({
            data
        })
        res.status(httpstatus.OK).json({message:"Student Registered Successfully", student})

    }catch(error){
        console.log(error)
    }
}