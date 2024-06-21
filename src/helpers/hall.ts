import prisma from "../utils/prismaUtil";



export const addHall = async (data: any) => {

    const hall = await prisma.hall.create({
        data
    })
    return hall;
}


export const getHalls = async () => {
    const hall = await prisma.hall.findMany({
        orderBy: [
            { createdAt: 'desc' }
        ]
    })
    return hall;
}

export const editHall = async (id: string, data: any) => {
    const hall = await prisma.hall.update({
        where: {
            id
        },
        data
    })
    return hall;
}

export const deleteHall = async (id: string) => {
    const hall = await prisma.hall.delete({
        where: {
            id
        }
    })
    return hall;
}


export const getSingle = async (id: string) => {
    const hall = await prisma.hall.findUnique({
        where: {
            id
        }
    })
    return hall;
}