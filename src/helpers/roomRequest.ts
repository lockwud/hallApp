import prisma from "../utils/prismaUtil"

export const makeRequest = async(data: any)=>{
    const request = await prisma.roomRequest.create({
        data
    })
    return request
};

export const loadRequests = async()=>{
    const requests = await prisma.roomRequest.findMany({
        orderBy: [
            { createdAt: 'desc' }
        ]
    })
    return requests
};

export const loadSingleRequest = async(id: string)=>{
    const request = await prisma.roomRequest.findUniqueOrThrow({
        where:{
            id
        }
    })
    return request
};

export const editRequest = async(StudentId: string, data: any)=>{
    const request = await prisma.roomRequest.update({
        where:{
            StudentId
        },
        data
    })
    return request
}

export const deleteRequest = async(id: string)=>{
    const request = await prisma.roomRequest.delete({
        where:{
            id
        }
    })
    return request
};