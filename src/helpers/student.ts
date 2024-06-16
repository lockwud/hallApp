import prisma from "../utils/prismaUtil"

export const addStudent = async(data)=>{
    const student = await prisma.student.create({
        data
    })
    return student
}