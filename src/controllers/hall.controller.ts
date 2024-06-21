import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import CustomError from "../utils/CustomError";
import { httpstatus } from "../utils/httpstatus";
import {
    getHalls,
    getSingle,
    addHall,
    editHall,
    deleteHall,
} from "../helpers/hall";

export const registerHall = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body;
        const hall = await addHall(data);

        res.status(httpstatus.OK).json({
            hall,
        });
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(500, error.toString()));
    }
};


export const getHall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const hall = await getSingle(id);
        res.status(httpstatus.OK).json({
            hall,
        });
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(500, error.toString()));
    }
}

export const loadHalls = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const hall = await getHalls()
        res.status(httpstatus.OK).json({
            hall,
        });
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(500, error.toString()));
    }
}
export const updateHall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const data = req.body
        const hall = await editHall(id, data);

        res.status(httpstatus.OK).json({
            hall,
        });
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(500, error.toString()));
    }
}

export const removeHall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const hall = await deleteHall(id);
        res.status(httpstatus.OK).json({
            hall,
        });

    } catch (error: any) {
        logger.error(error);
        next(new CustomError(500, error.toString()));
    }
}