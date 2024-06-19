import {Request, Response, NextFunction} from "express"
import {httpstatus} from "../utils/httpstatus";
import customError from "../utils/CustomError";
import logger from "../utils/logger";

import{
    saveRoom,
    getSingleRoom,
    getRoom,
    updateRoom,
    removeRoom
}from "../helpers/rooms"

export const addRoom = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const data: any = req.body
        const room = await saveRoom(data)
        res.status(httpstatus.OK).json({message: "Room Saved", room})

    }catch(error: any){
        console.log(error)
        logger.error(error)
        next(new customError(500, error.toString()))
    }
    
};

export const listRoom = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const room = await getRoom()
        res.status(httpstatus.OK).json({room})

    }catch(error: any){
        console.log(error)
        logger.error(error)
        next(new customError(500, error.toString()))
    }
    
};

export const getRoomById = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const room = await getSingleRoom(id)
        res.status(httpstatus.OK).json({room})

    }catch(error: any){
        console.log(error)
        logger.error(error)
        next(new customError(500, error.toString()))
    }
    
};

export const roomUpdate = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const data = req.body
        const room = await updateRoom(id, data)
        res.status(httpstatus.OK).json({message:"updated", room})

    }catch(error: any){
        console.log(error)
        logger.error(error)
        next(new customError(500, error.toString()))
    }
};

export const deleteRoom = async(req: Request, res: Response, next: NextFunction)=>{
    try{

    }catch(error: any){
        console.log(error)
        logger.error(error)
        next(new customError(500, error.toString()))
    }
};

