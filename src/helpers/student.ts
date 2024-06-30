import prisma from "../utils/prismaUtil"
declare global {
    namespace Express {
        interface Request {
            student?: any; 
        }
    }
}

export const addStudent = async(data: any)=>{
    const student = await prisma.student.create({
        data
    })
    return student
};

export const getStudent = async()=>{
    const student = await prisma.student.findMany()
    return student
    
};

export const getStudentById = async(studentId:string)=>{
    const student = await prisma.student.findUnique({
        where: {studentId}
    })
    return student
};

export const updateStudent = async(studentId: string, data: any)=>{
    const student = await prisma.student.update({
        where:{
            studentId
        },
        data
    })
    return student
};

export const deleteStudent = async(studentId: string)=>{
    const student = await prisma.student.delete({
        where:{
            studentId: studentId
        }
    })
    return student
};

export const signIn = async(telephone: string)=>{
    const student = await prisma.student.findUnique({
        where:{
            telephone
        }
    })
    return student
}