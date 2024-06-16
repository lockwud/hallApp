import prisma from "../utils/prismaUtil";

export const loadAdmins = async () => {
    const admins = await prisma.admin.findMany({
        orderBy: [
            { createdAt: 'desc' }
        ]
    })
    return admins
}


export const deleteAdmin = async (id: string) => {
    const admin = await prisma.admin.delete({
        where: {
            id
        }
    })
    return admin
}


export const editAdmin = async (data: any, id: string) => {

    const admin = await prisma.admin.update({
        where: {
            id
        },
        data
    })
    return admin
}

export const addAdmin = async (data: any) => {
    const admin = await prisma.admin.create({
        data
    })
    return admin
}

export const loadSingleAdmin = async (id: string) => {
    const admin = await prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    })
    return admin
}