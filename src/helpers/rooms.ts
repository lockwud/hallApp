import prisma from "../utils/prismaUtil"
export const saveRoom = async(data: any) =>{
    const room = await prisma.rooms.create({data})
    return room
};

export const getRoom = async() =>{
    const room = await prisma.rooms.findMany({
        orderBy: [
            { createdAt: 'desc' }
        ]
    })
    return room
};

export const getSingleRoom = async(id: string)=>{
    const room = await prisma.rooms.findUnique({
        where:{
            id
        }
    })
    return room
};

export const updateRoom = async(id: string , data: any)=>{
    const room = await prisma.rooms.update({
        where:{
            id
        },
        data
    })
    return room
};

export const removeRoom = async(id: string)=>{
    const room = await prisma.rooms.delete({
        where:{
            id
        }
    })
    return room
};