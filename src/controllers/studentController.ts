import { NextFunction, Request,Response } from "express"
import {httpstatus} from "../utils/httpstatus"


import argon2 from "argon2"


import {
    addStudent
} from "../helpers/student"

export const registerStudent = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        const data:any = req.body
        data.password = await argon2.hash(data.password)
        const student = await addStudent(data)
        delete data.password

        res.status(httpstatus.OK).json({message:"Student Registered Successfully", student})

    }catch(error){
        console.log(error)
    }
}