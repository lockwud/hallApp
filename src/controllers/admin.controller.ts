import prisma from "../utils/prismaUtil";
import express, { Express, NextFunction, Request, Response } from "express";
import { hashPassword, verifyPassword } from "../utils/argon2";
import { httpstatus } from "../utils/httpstatus";
import CustomError from "../utils/CustomError";

import { loadAdmins, loadSingleAdmin, editAdmin, deleteAdmin, addAdmin } from "../helpers/admin";
import logger from "../utils/logger";


export const adminSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = req.body;
        data.password = await hashPassword(data.password)
        const admin = await addAdmin(data)
        if (!admin) {
            throw new CustomError(httpstatus.INTERNAL_SERVER_ERROR, "An Error Occured")
        }
        const { password, ...adminWithoutPassword } = admin;
        console.log(adminWithoutPassword)
        res.status(httpstatus.CREATED).json({
            message: "Admin Registered Successfully",
            adminWithoutPassword,

        })
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password }: { password: string } = req.body;
        const systemPassword = req.admin.password;
        const checkPassword = await verifyPassword(password, systemPassword);
        if (!checkPassword) {

            throw new CustomError(400, 'Invalid credentials');
        } else {
            delete req.admin.password;
            res.status(httpstatus.OK).json({
                message: 'User successfully logged in!',
                id: req.admin.id,
            });
        }
    } catch (error: any) {
        logger.error(error)
        next(new CustomError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};


export const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await loadAdmins();
        res.status(httpstatus.OK).json({
            admins
        })
    } catch (error: any) {
        logger.error(error)
        next(new CustomError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
}


export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id } = req.params
        const data = req.body
        const admin = await editAdmin(id, data);

        res.status(httpstatus.OK).json({
            admin
        })

    } catch (error: any) {
        logger.error(error)
        next(new CustomError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
}
//  can nestjs be used for microservices?

export const getSingleAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const admin = await loadSingleAdmin(id)
        const { password, ...adminWithoutPassword } = admin;
        res.status(httpstatus.OK).json({
            adminWithoutPassword
        })
    } catch (error: any) {
        logger.error(error)
        next(new CustomError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
}

export const removeAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const admin = await deleteAdmin(id)
        res.status(httpstatus.OK).json({
            admin
        })
    } catch (error: any) {
        logger.error(error)
        next(new CustomError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
}