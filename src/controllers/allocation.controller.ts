import logger from "../utils/logger";
import express, { Request, Response, NextFunction } from "express";
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
        const data:any = req.body;
        const allocation = await addAllocation(data);
        res.status(200).json({
            allocationDetails: allocation,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const findAllocationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const allocation = await allocateById(id);
        res.status(200).json({
            allocationDetails: allocation,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const updateAllocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const allocation = await editAllocation(id, data);
        res.status(200).json({
            allocation,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const getAllAlacocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allocations = await loadAllocations();
        res.status(200).json({
            allocations,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allocation = await loadAnalytics();
        res.status(200).json({
            allocation,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const deleteAllocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const allocation = await removeAllocation(id);
        res.status(200).json({
            allocation,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};