import z from "zod"

export const studentSchema = z.object({
    profile: z.string(),
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    gender: z.string(),
    level: z.string(),
    telephone: z.string().length(10),
})

export const adminSchema = z.object({
    fullname: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    telephone: z.string().length(10).optional(),
})

export const allocationSchema = z.object({
    studentId: z.string(),
    roomsId: z.string(),
})

export const hallSchema = z.object({
    name: z.string(),
    location: z.string()

})
export const roomSchema = z.object({

})
