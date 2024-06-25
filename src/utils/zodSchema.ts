
import zod from "zod"

export const studentSchema = zod.object({
    profile: zod.string(),
    fullName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
    gender: zod.string(),
    level: zod.string(),
    telephone: zod.string().length(10),
})

export const adminSchema = zod.object({
    fullname: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
    telephone: zod.string().length(10).optional(),
})

export const allocationSchema = zod.object({
    studentId: zod.string(),
    roomsId: zod.string(),
})

export const hallSchema = zod.object({
    name: zod.string(),
    location: zod.string()

})
export const roomSchema = zod.object({

})
