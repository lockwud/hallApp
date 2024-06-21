import logger from "../utils/logger";
import prisma from "../utils/prismaUtil"
import { Request, Response, NextFunction } from "express"
import customError from "../utils/CustomError"
import { httpstatus } from "../utils/httpstatus"

export const checkAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { telephone }: { telephone: string } = req.body;

        const student = await prisma.student.findUnique({
            where: {
                telephone: telephone
            }
        })
        if (student) {
            res.status(httpstatus.UNAUTHORIZED).json({ message: "Student Already Registered" })
        } else {
            next()
        }
    } catch (error: any) {
        console.log(error)
        logger.error(error)
        next(new customError(500, error.toString()))
    }
};  