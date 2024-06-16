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
            throw new CustomError(500, "An Error Occured")
        }
        const { password, ...adminWithoutPassword } = admin;
        console.log(adminWithoutPassword)
        res.status(httpstatus.CREATED).json({
            message: "Admin Registered Successfully",
            adminWithoutPassword,

        })
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(500, error.toString()))
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
            res.status(200).json({
                message: 'User successfully logged in!',
                id: req.admin.id,
            });
        }
    } catch (error: any) {
        logger.error(error)
        next(new CustomError(500, error.toString()))
    }
};


export const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await loadAdmins();
        res.status(200).json({
            admins
        })
    } catch (error: any) {
        logger.error(error)
        next(new CustomError(500, error.toString()))
    }
}


export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id } = req.params
        const data = req.body
        const admin = await editAdmin(id, data);

        res.status(200).json({
            admin
        })

    } catch (error: any) {
        logger.error(error)
        next(new CustomError(500, error.toString()))
    }
}

export const getSingleAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const admin = await loadSingleAdmin(id)
        res.status(200).json({
            admin
        })
    } catch (error: any) {
        logger.error(error)
        next(new CustomError(500, error.toString()))
    }
}

export const removeAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const admin = await deleteAdmin(id)
        res.status(200).json({
            admin
        })
    } catch (error: any) {
        logger.error(error)
        next(new CustomError(500, error.toString()))
    }
}