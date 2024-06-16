import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prismaUtil";

declare global {
    namespace Express {
        interface Request {
            validatedEmail?: string;
            admin?: any; 
        }
    }
}

export const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email }: { email: string } = req.body;
        const admin = await prisma.admin.findUnique({
            where: {
                email
            }
        });

        if (admin) {
            res.status(400).json({ message: "Email Already Exists" });
        } else {
            
            req.admin = admin;

            next(); 
        }
    } catch (error) {
        console.error('Error in validateEmail middleware:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};
