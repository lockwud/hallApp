import prisma from "../utils/prismaUtil";
export const addAllocation = async (data: any) => {
    const allocation = await prisma.allocation.create({
        data,
    });
    return allocation;
};
export const allocateById = async (id: string) => {
    const allocation = await prisma.allocation.findUnique({
        where: {
            id,
        },
    });
    return allocation;
};
export const editAllocation = async (id: string, data: any) => {
    const allocation = await prisma.allocation.update({
        where: {
            id,
        },
        data,
    });
    return allocation;
};
export const loadAllocations = async () => {
    const allocations = await prisma.allocation.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return allocations;
};
export const loadAnalytics = async () => {
    const allocation = await prisma.allocation.groupBy({
        by: ['roomsId', 'studentId'],
        _count: true,
    });
    return allocation;
};
export const removeAllocation = async (id: string) => {
    const allocation = await prisma.allocation.delete({
        where: {
            id,
        },
    });
    return allocation;
};

