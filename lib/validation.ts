import { z } from "zod";

export const signUpSchema = z.object({
    firstName: z.string().nonempty({message:'First Name required'}),
    lastName: z.string().nonempty({message:'Last Name required'}),
    email: z.string().email(),
    password: z.string().min(8,{message: 'minimal 8 char'}),
    confirmPassword: z.string().min(8,{message: 'minimal 8 char'}),
}).refine((el) => el.password === el.confirmPassword,{
    message: 'password doesn\'t match',
    path: ['confirmPassword']    
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message: 'minimal 8 char'}),
})

// type
export type TSignUpSchema = z.infer<typeof signUpSchema>
export type TSignInSchema = z.infer<typeof signInSchema>
