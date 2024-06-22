import { NextFunction, Request, Response } from "express";
import { httpstatus } from "../utils/httpstatus";
import customError from "../utils/CustomError";
import logger from "../utils/logger";

import {
    makeRequest,
    loadRequests,
    loadSingleRequest,
    editRequest,
    deleteRequest
}from "../helpers/roomRequest"

export const addRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = req.body;
        const request = await makeRequest(data);
        res.status(httpstatus.OK).json({
            requestDetails: request,
        });
    } catch (error: any) {
        logger.error(error);
        next(new customError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};

export const getRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requests = await loadRequests();
        res.status(httpstatus.OK).json({
            requests,
        });
    } catch (error: any) {
        logger.error(error);
        next(new customError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
    }
};

export const getRequestById = async (req: Request, res: Response, next: NextFunction) => {
   try{
    const {StudentId} = req.params
    const request = await loadSingleRequest(StudentId)
    res.status(httpstatus.OK).json({
        requestDetails: request
    });

   }catch(error: any){
    console.log(error)
    logger.error(error)
    next(new customError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
   }
    
};

export const updateRequest = async(req: Request, res: Response, next: NextFunction)=>{
   try{
    const {StudentId} = req.params
    const data: any = req.body
    const request = await editRequest(StudentId, data)
    res.status(httpstatus.OK).json({
        requestUpdated: request
    });

   }catch(error: any){
    console.log(error)
    logger.error(error)
    next(new customError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
   }
    
}

export const removeRequest = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {StudentId} = req.params
        const request = await deleteRequest(StudentId)
        res.status(httpstatus.OK).json({
            requestDeleted: request
        });

}catch(error: any){
    console.log(error)
    logger.error(error)
    next(new customError(httpstatus.INTERNAL_SERVER_ERROR, error.toString()))
}
};

