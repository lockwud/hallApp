import zod from "zod"

export const Schema = zod.object({
    studentId: zod.string(), 
    profile: zod.string(),    
    fullName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
    gender: zod.string(),
    level: zod.number(),    
    telephone: zod.string().length(10),
    error: zod.any()
})

