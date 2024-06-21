import logger from "../utils/logger";
import CustomError from "../utils/CustomError";
import express, { Request, Response, NextFunction } from "express";
import { httpstatus } from "../utils/httpstatus";
import {
    addAllocation,
    allocateById,
    editAllocation,
    loadAllocations,
    loadAnalytics,
    removeAllocation,
} from '../helpers/allocation';

export const saveAllocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = req.body;
        const allocation = await addAllocation(data);
        res.status(httpstatus.CREATED).json({
            allocationDetails: allocation,
        });
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};

export const findAllocationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const allocation = await allocateById(id);
        res.status(httpstatus.OK).json({
            allocationDetails: allocation,
        });
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};

export const updateAllocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const allocation = await editAllocation(id, data);
        res.status(httpstatus.OK).json({
            allocation,
        });
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};

export const getAllAlacocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allocations = await loadAllocations();
        res.status(httpstatus.OK).json({
            allocations,
        });
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};

export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allocation = await loadAnalytics();
        res.status(200).json({
            allocation,
        });
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(500, error.toString()))
    }
};

export const deleteAllocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const allocation = await removeAllocation(id);
        res.status(httpstatus.OK).json({
            allocation,
        });
    } catch (error: any) {
        logger.error(error);
        next(new CustomError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};