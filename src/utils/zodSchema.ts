
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



export const roomSchema = zod.object({

})
